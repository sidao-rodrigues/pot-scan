import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Profile } from 'src/app/models/profile.model';
import { WifiService } from 'src/app/services/wifi.service';

@Component({
  selector: 'app-wifi',
  templateUrl: './wifi.page.html',
  styleUrls: ['./wifi.page.scss'],
})
export class WifiPage implements OnInit {

  // public valueRadio: number = 1;]
  public fieldsAreEnabled = false;
  public infoBeta = false;
  public profile: Profile;
  public profiles: Array<Profile> = [];

  public authForm: FormGroup;

  constructor(
    private wifiService: WifiService,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.createForm();
    this.getAllProfies();
  }

  private createForm(): void {
    this.authForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      pt: ['', [Validators.required]],
      gt: ['', [Validators.required]],
      gr: ['', [Validators.required]],
      d0: ['', [Validators.required]],
      beta: ['', [Validators.required]],
    });
  }

  get nome(): FormControl {
    return <FormControl> this.authForm.get('nome');
  }
  get pt(): FormControl {
    return <FormControl> this.authForm.get('pt');
  }
  get gt(): FormControl {
    return <FormControl> this.authForm.get('gt');
  }
  get gr(): FormControl {
    return <FormControl> this.authForm.get('gr');
  }
  get d0(): FormControl {
    return <FormControl> this.authForm.get('d0');
  }
  get beta(): FormControl {
    return <FormControl> this.authForm.get('beta');
  }


  getAllProfies(){
    this.wifiService.getAllProfiles()
      .then((data: Array<Profile>) => {
        this.profile = data[0];
        this.profiles = data;
      })
      .catch(e => console.log(e));
  }

  getSelectedProfile(_id){
    this.profile = this.profiles.find(profile => profile._id == _id);
    this.authForm.controls['nome'].setValue(this.profile.nome);
    this.authForm.controls['pt'].setValue(this.profile.pt.toFixed(2));
    this.authForm.controls['gt'].setValue(this.profile.gt.toFixed(2));
    this.authForm.controls['gr'].setValue(this.profile.gr.toFixed(2));
    this.authForm.controls['d0'].setValue(this.profile.d0.toFixed(2));
    this.authForm.controls['beta'].setValue(this.profile.beta.toFixed(2));
  }

  radioGroupChange(event){
    this.getSelectedProfile(event.detail.value);
  }

  addProfile(){
    this.wifiService.getQtdMaxProfile()
      .then(data => {
        if(data <= 5){
          this.fieldsAreEnabled = true;
          this.authForm.reset();
        } else {
          this.presentToastMenssage('Maximum limit of 5 profiles', 3000);
        }
      });
  }

  private async presentToastMenssage(name: any, duration: number) {
    const toast = await this.toastCtrl.create({
      message: name,
      duration: duration,
      position: 'top',
      color: 'light',
      buttons: [
        {
          text: 'x',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}

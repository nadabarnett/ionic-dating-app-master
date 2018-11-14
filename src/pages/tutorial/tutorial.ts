import { Component } from '@angular/core';
import {   NavController, AlertController} from 'ionic-angular';

import { IonicPage, ToastController } from 'ionic-angular';


export interface Slide {
  title: string;
  description: string;
  image: string;
}

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})
export class TutorialPage {

  // Our translated text strings
 // private loginErrorString: string;
  public login_email: any;
  public login_password: any;
  public regist_email: any;
  public regist_password: any;
  slides: Slide[];
  showSkip = true;
  dir: string = 'ltr';
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
   // public translateService: TranslateService,
    private alertCtrl: AlertController) {
    //this.translateService.get('LOGIN_ERROR').subscribe((value) => {
   //     this.loginErrorString = value;
    //  })
    }

  alert(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:message,
      buttons:['OK']
    });
    alert.present();
  }



  doLogin() 
  {
      this.navCtrl.push("LoginPage");
  }
  doRegister() 
  {
this.navCtrl.push("RegisterPage");
  }


}

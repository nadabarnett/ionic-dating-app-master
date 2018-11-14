import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AccountUser } from "../../models/accountuser"

import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  accountuser = {} as AccountUser;

  // Our translated text strings
  //private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    //public translateService: TranslateService,
    private ofAuth:AngularFireAuth,
    private alertCtrl: AlertController) {
    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // })
  }

  alert(title:string, message:string) {
    let alert = this.alertCtrl.create({
      title:title,
      subTitle:message,
      buttons:['OK']
    });
    alert.present();
  }
  // Attempt to login in through our User service
  async doLogin(accountuser:AccountUser) {
      if((!accountuser.email)||(!accountuser.password))
        this.alert("Error","Please Input Required Field");
      else {
       this.ofAuth.auth.signInWithEmailAndPassword(accountuser.email,accountuser.password).then((res: any) =>{
        if(!res.code)
          this.navCtrl.push(MainPage);
        }).catch((err)=>{
          this.alert("Login Failed","Username or Password Incorrect!");
        })
      }
    }
    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    //   // Unable to log in
    //   let toast = this.toastCtrl.create({
    //     message: this.loginErrorString,
    //     duration: 3000,
    //     position: 'top'
    //   });
    //   toast.present();
    // });
  signup() {
    this.navCtrl.push('SignupPage');
  }
}

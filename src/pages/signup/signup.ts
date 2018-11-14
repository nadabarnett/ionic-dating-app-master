import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';


// import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { AccountUser } from "../../models/accountuser";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  
  accountuser = {} as AccountUser;
  // Our translated text strings
  //private signupErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    //public translateService: TranslateService,
  //  private fdb: AngularFireDatabase,
    private ofAuth: AngularFireAuth,
    public toastCntrl: ToastController) {

    //this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
    //  this.signupErrorString = value;
    //});
    //this.fdb.list('/').valueChanges().subscribe(data => { console.log(JSON.stringify(data))});

  }

  async doSignup() {
    var toaster = this.toastCntrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if((!this.accountuser.email)||(!this.accountuser.password)){
      toaster.setMessage('All fields are required');
      toaster.present();
    }
      
    else if(this.accountuser.password.length < 7)
      {
        toaster.setMessage('Password is not strong. Try giving more than six characters');
        toaster.present();
      }
    else {

      this.ofAuth.auth.createUserWithEmailAndPassword(this.accountuser.email,this.accountuser.password).then((res: any) =>{
        if(!res.code)
          {
                
          }
        }).catch((err)=>{
          toaster.setMessage(err);
          toaster.present();
        })
    }
   // this.navCtrl.push(MainPage);


  }
  login() {
    this.navCtrl.push('LoginPage');
  }
}

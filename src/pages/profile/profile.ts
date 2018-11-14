import { Component, ViewChild } from '@angular/core';
import { App, IonicPage, NavController, NavParams, Slides, ViewController, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Platform } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Slides) slides: Slides;
  currentSlideIndex: number = 0;
  slideImages: any[] = [
    { url: 'assets/img/1.jpg' },
    { url: 'assets/img/2.jpg' },
    { url: 'assets/img/3.jpg' }
  ];
  isMe: boolean = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public statusBar: StatusBar,
    public platform: Platform,
    public modalCtrl: ModalController,
    public app: App ) {
    platform.ready().then(() => {
      statusBar.hide();
    });

    this.isMe = typeof this.navParams.get('isMe') == 'undefined' ? true : this.navParams.get('isMe');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  slideChanged() {
    this.currentSlideIndex = this.slides.getActiveIndex();
  }

  close() {
    this.statusBar.show();
    this.viewCtrl.dismiss();
  }

  edit() {
    // this.close();
    // let modal = this.modalCtrl.create(ProfileEditPage);
    // modal.present();
  }

}

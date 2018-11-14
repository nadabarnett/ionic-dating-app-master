import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';

/**
 * Generated class for the InstagramPhotoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'instagram-photo',
  templateUrl: 'instagram-photo.html',
})
export class InstagramPhotoPage {
  @ViewChild(Slides) slides: Slides;
  currentSlideIndex: number = 0;
  slideImages: any[] = [
    {
      page: [
        { url: 'assets/img/instagram/insta_0.jpg' },
        { url: 'assets/img/instagram/insta_1.jpg' },
        { url: 'assets/img/instagram/insta_2.jpg' },
        { url: 'assets/img/instagram/insta_3.jpg' },
        { url: 'assets/img/instagram/insta_4.jpg' },
        { url: 'assets/img/instagram/insta_5.jpg' }
      ]
    },
    {
      page: [
        { url: 'assets/img/instagram/insta_6.jpg' },
        { url: 'assets/img/instagram/insta_7.jpg' }
      ]
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InstagramPhotoPage');
  }

  slideChanged() {
    this.currentSlideIndex = this.slides.getActiveIndex();
  }

}

import { Component, ViewChild} from '@angular/core';
import { IonicPage, NavController,Slides  } from 'ionic-angular';

import { AngularFireAuth } from "angularfire2/auth";

import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-preference',
  templateUrl: 'preference.html'
})
export class PreferencePage {
  @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;
  page: any;
  vm_distancepre: any = 10;
  vm_agepre: any = { lower: 16, upper: 60 };
  casual_distancepre: any = 10;
  casual_agepre: any = { lower: 16, upper: 60 };
  relation_distancepre: any = 10;
  relation_agepre: any = { lower: 16, upper: 60 };


  constructor(public navCtrl: NavController, public fdb: AngularFireDatabase,public ofAuth:AngularFireAuth) {
      firebase.database().ref('preference_vm/' + this.ofAuth.auth.currentUser.uid).on('value',data =>{
        if(data.val()) {
          this.vm_agepre.lower = data.val().startage;
          this.vm_agepre.upper = data.val().endage;
          this.vm_distancepre = data.val().distance;
      }
      });
    

      firebase.database().ref('preference_casual/' + this.ofAuth.auth.currentUser.uid).on('value',data =>{
        if(data.val()) {
          this.casual_agepre.lower = data.val().startage;
          this.casual_agepre.upper = data.val().endage;
          this.casual_distancepre = data.val().distance;
      }
      });
    

      firebase.database().ref('preference_relation/' + this.ofAuth.auth.currentUser.uid).on('value',data =>{
        if(data.val()) {
          this.relation_agepre.lower = data.val().startage;
          this.relation_agepre.upper = data.val().endage;
          this.relation_distancepre = data.val().distance;
      }
      });   
  }

  // Initialize slider
  ionViewDidEnter(){
    this.slideChanged();
  }

  // On segment click
  selectedTab(index) {
    this.slider.slideTo(index);
  }


  // On slide changed
  slideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    this.page = currentIndex.toString();
    this.centerScroll();
  }

  // Center current scroll
  centerScroll(){
    if(!this.segments || !this.segments.nativeElement)
      return;

    let sizeLeft = this.sizeLeft();
    if(this.segments.nativeElement.children[this.page])
    {
      let sizeCurrent = this.segments.nativeElement.children[this.page].clientWidth;
      let result = sizeLeft - (window.innerWidth / 2) + (sizeCurrent/2) ;

      result = (result > 0) ? result : 0;
      this.smoothScrollTo(result);
    }
  }

  // Get size start to current
  sizeLeft(){
    let size = 0;
    for(let i = 0; i < this.page; i++){
      size+= this.segments.nativeElement.children[i].clientWidth;
    }
    return size;
  }

  // Easing function
  easeInOutQuart(time, from, distance, duration) {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  }

  // Animate scroll
  smoothScrollTo(endX){
    let startTime = new Date().getTime();
    let startX = this.segments.nativeElement.scrollLeft;
    let distanceX = endX - startX;
    let duration = 400;

    let timer = setInterval(() => {
      var time = new Date().getTime() - startTime;
      var newX = this.easeInOutQuart(time, startX, distanceX, duration);
      if (time >= duration) {
        clearInterval(timer);
      }
      this.segments.nativeElement.scrollLeft = newX;
    }, 1000 / 60); // 60 fps
  }
  onvmSave() {
      firebase.database().ref('preference_vm/' + this.ofAuth.auth.currentUser.uid).set({
        startage:this.vm_agepre.lower,
        endage:this.vm_agepre.upper,
        distance:this.vm_distancepre,
        gender:'male'
      });
    }
    oncasualSave() {
      firebase.database().ref('preference_casual/' + this.ofAuth.auth.currentUser.uid).set({
        startage:this.casual_agepre.lower,
        endage:this.casual_agepre.upper,
        distance:this.casual_distancepre,
        gender:'male'
      });
    }
    onrelationSave() {
      firebase.database().ref('preference_relation/' + this.ofAuth.auth.currentUser.uid).set({
        startage:this.relation_agepre.lower,
        endage:this.relation_agepre.upper,
        distance:this.relation_distancepre,
        gender:'male'
      });
    }
    
}

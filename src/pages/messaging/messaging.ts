import { Component,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams ,Slides} from 'ionic-angular';

//import { ExplorePage } from '../explore/explore';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';
import { ChatPage } from '../chat/chat';

@IonicPage()
@Component({
  selector: 'page-messaging',
  templateUrl: 'messaging.html',
})
export class MessagingPage {
    @ViewChild('slider') slider: Slides;
  @ViewChild("segments") segments;

  images = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg'];
  messages: any[] = [];
    page: any;

  typingMessage: string = '';
  constructor(    
    public fdb: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private ofAuth: AngularFireAuth)
  {
    firebase.database().ref('chat/').on('value',data => {
    data.forEach( item => 
     {
        
        if(item.val().from == this.ofAuth.auth.currentUser.email)
        {
            for(var j=0;j<this.messages.length;j++)
            {
              if(this.messages[j].email == item.val().to)
              {
                  this.messages.splice(j,1);
              }
            }
            this.messages.push(
            {
              email:item.val().to,
              body:item.val().body,
              type:'text'
            });
        }
        if(item.val().to == this.ofAuth.auth.currentUser.email)
        {
            for(var k=0;k<this.messages.length;k++)
            {
              if(this.messages[k].email == item.val().from)
              {
                  this.messages.splice(k,1);
              }
            }
            this.messages.push(
            {
              email:item.val().from,
              body:item.val().body,
              type:'text'
            });
        }
     });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagingPage');
  }

  goToChat(isNewMatch = false) {
    this.navCtrl.push(ChatPage, {isNewMatch: isNewMatch});
  }
  gotochat(target){
    this.navCtrl.push('ChatPage',{to_email : target});
  }

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

}

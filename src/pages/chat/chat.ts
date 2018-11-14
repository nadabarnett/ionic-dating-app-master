import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase';

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;
 // messages : FirebaseListObservable<any[]>;
  isNewMatch: boolean = false;
  messages: any[] = [];
  typingMessage: string = '';
  showGiphy: boolean = false;
  IsMe : boolean;
  to_email : string = '';
  flag :boolean;
  //messages: object [] =[];
  constructor(    
    public fdb: AngularFireDatabase,
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private ofAuth: AngularFireAuth) {
    this.isNewMatch = this.navParams.get('isNewMatch');

    this.to_email = this.navParams.get('to_email');
    console.log(this.messages);
    firebase.database().ref('chat/').on('value',data => {
          while(this.messages.length>0)
          this.messages.pop();
     data.forEach( item => 
     {
        
        if(item.val().from == this.ofAuth.auth.currentUser.email)
        {
          if(item.val().to == this.to_email)
          {
              this.messages.push(
              {
                body:item.val().body,
                type:'text',
                isMe:true
              });
          }
        }
        if(item.val().from == this.to_email )
        {
          if(item.val().to == this.ofAuth.auth.currentUser.email)
          {
            this.messages.push(
              {
                body:item.val().body,
                type:'text',
                isMe:false
              });
          }
        }

     });
    })

    // this.fdb.list('/chats').subscribe(data => {
    //   data.map( elem => {
    //     this.messages.push(elem);
    //   })
    // });
    this.init();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.scrollBottom();
  }

  init() {
        //this.scrollBottom();


    // TODO: can be an API response
    // if (!this.isNewMatch) {
    //   this.messages = [
    //     {
    //       isMe: true,
    //       type: 'text',// text || image
    //       body: 'Where are you, buddy?',
    //       timestamp: 'Oct 10, 2017 9:53am'
    //     },
    //     {
    //       isMe: false,
    //       avatar: 'https://firebasestorage.googleapis.com/v0/b/mobiledatingapp.appspot.com/o/Untitled.png',
    //       type: 'text',// text || image
    //       body: 'I\'m almost there',
    //       timestamp: 'Oct 10, 2017 9:53am'
    //     }
    //   ];
    // }
  }

  sendGif(imageUrl) {
    this.messages.push({
      isMe: true,
      type: 'image',
      body: imageUrl,
      timestamp: 'Oct 13, 2017 9:53am'
    });
    this.scrollBottom();

 //   this.fakeReply();
  }

  sendText() {
    this.fdb.list('/chat').push({
      isMe:true,
      to:this.to_email,
      from:this.ofAuth.auth.currentUser.email,
      body:this.typingMessage,
      type:'text'
    });
    // this.messages.push({
    //   isMe: true,
    //   type: 'text',
    //   body: this.typingMessage,
    //   timestamp: 'Oct 13, 2017 9:55am'
    // });
    this.typingMessage = '';
    this.scrollBottom();

 //   this.fakeReply();
  }

  // fakeReply() {
  //   setTimeout(() => {
  //     this.messages.push({
  //       isMe: false,
  //       avatar: 'assets/img/hieu.png',
  //       type: 'text',
  //       body: 'Nice. Keep typing dude',
  //       timestamp: 'Oct 10, 2017 9:55am'
  //     });

  //     this.scrollBottom();
  //   }, 500);
  // }

  scrollBottom() {
    this.content.resize();
    this.content.scrollTo(0, this.content.scrollHeight, 350);
  }

  toggleGiphy() {
    this.showGiphy = !this.showGiphy;
    this.content.resize();
  }

}

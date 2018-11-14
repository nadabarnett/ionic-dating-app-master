import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
//import { AngularFireAuth } from "angularfire2/auth";
//import { AngularFireDatabase } from 'angularfire2/database';
//import * as firebase from 'firebase';

//let options = 
//{
//  enableHighAccuracy: true,
//  timeout: 5000,
//  maximumAge: 0
//};
@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {


}

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */


  /**
   * Delete an item from the list of items.
   */


  /**
   * Navigate to the detail page for this item.
   */
  openItem(flag) {
    if( flag == 1)
    {
//    this.navCtrl.push('ChatPage');  
    }
    else if( flag == 2)
      this.navCtrl.push('CasualmeetupPage');
    else if( flag == 3)
      this.navCtrl.push('RelationPage');
   }


}

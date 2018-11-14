import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserProvider {

  firedata = firebase.database().ref('/users');

  constructor(public afireauth: AngularFireAuth) {
    console.log('Hello UserProvider Provider');
  }

  addUser(newUser){
    var promise = new Promise((resolve, reject)=>{
      this.afireauth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(()=>{
        this.afireauth.auth.currentUser.updateProfile({
          displayName: newUser.displayName,
          photoURL: 'https://firebasestorage.googleapis.com/v0/b/chat-application-39c4b.appspot.com/o/765-default-avatar.png?alt=media&token=588f8397-a6dd-4f63-b85d-2f0878d49e9a'
        }).then(()=>{
          this.firedata.child(this.afireauth.auth.currentUser.uid).set({
            uid: this.afireauth.auth.currentUser.uid,
            displayName: newUser.displayName,
            photoURL:'https://firebasestorage.googleapis.com/v0/b/chat-application-39c4b.appspot.com/o/765-default-avatar.png?alt=media&token=588f8397-a6dd-4f63-b85d-2f0878d49e9a'
          }).then(() =>{
            resolve({ success: true})
          }).catch((err) =>{
            reject(err);
          })
        }).catch((err)=>{
          reject(err)
        })
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise;
  }

  passwordreset(email){
    var promise = new Promise((resolve, reject)=>{
      firebase.auth().sendPasswordResetEmail(email).then(()=>{
        resolve({ success: true});
      }).catch((err)=>{
        reject(err);
      })
    })
    
    return promise
  }

  updateimage(imageurl){
    var promise = new Promise((resolve, reject)=>{
      this.afireauth.auth.currentUser.updateProfile({
        displayName: this.afireauth.auth.currentUser.uid,
        photoURL: imageurl
      }).then(()=>{
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
          displayName: this.afireauth.auth.currentUser.displayName,
          photoURL: imageurl,
          uid: firebase.auth().currentUser.uid
        }).then(()=>{
          resolve({success: true});
        }).catch((err)=>{
          reject(err)
        })
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise
  }

  getuserdetails(){
    var promise = new Promise((resolve, reject)=>{
    this.firedata.child(firebase.auth().currentUser.uid).once('value',(snapshot)=>{
      resolve(snapshot.val());      
    }).catch((err)=>{
      reject(err)
    });

    })
    return promise;
  }

  updatedisplayname(newname){
    var promise = new Promise((resolve, reject)=>{
      this.afireauth.auth.currentUser.updateProfile({
        displayName: newname,
        photoURL: this.afireauth.auth.currentUser.photoURL
      }).then(()=>{
        this.firedata.child(firebase.auth().currentUser.uid).update({
          displayname: newname,
          photoURL: this.afireauth.auth.currentUser.photoURL
        }).then(()=>{
          resolve({success: true})
        }).catch((err)=>{
          reject(err)
        })
      }).then(()=>{
        resolve({success: true})
      }).catch((err)=>{
        reject(err)
      })
    })

    return promise
    
  }

}

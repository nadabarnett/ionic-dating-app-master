import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform,IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

declare var google;
let map: any;
var markers = [];
var start_agepre;
var end_agepre;
//var distancepre;
var gender;
//var firstname;
//var photourl;
var selectedUid;
var uid_temp;
let options = 
{
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@IonicPage()

@Component({
  selector: 'page-relation',
  templateUrl: 'relation.html'
})

export class RelationPage 
{
 htmllat: any;
  htmllng: any;
  distancemap: any;
  afdb : any;

@ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public platform: Platform, public geolocation: Geolocation, public fdb: AngularFireDatabase,public ofAuth:AngularFireAuth) 
  {

    platform.ready().then(() => {
      this.initMap();
    });
  }
  initMap() 
  {

  //  var myplace = {lat: 40.1167, lng: -124.3833};

    //here we can get our current position by using geolocation
    navigator.geolocation.getCurrentPosition((location) => {     //location is area where am I


    //create map with property here zomm is 15
    map = new google.maps.Map(this.mapElement.nativeElement, 
    {
      center: {lat: location.coords.latitude, lng: location.coords.longitude},
      zoom: 15,
      disableDefaultUI:true        // if we set this property to true,zoom button disappear
    });



    //google.maps.Maraker function allows us to create map marker here this marker presents your current place
    var marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: {lat:location.coords.latitude,lng:location.coords.longitude}
    });

    //this function allow us to create current location button where is bottom right of google map
    this.addYourLocationButton(map, marker);



    //google.maps.places.PlacesService is a function which present us place service for example nearby buildings...
   // var service = new google.maps.places.PlacesService(map);

    //this.fdb.list('userinfos').push({lat:location.coords.latitude,lng:location.coords.longitude,id:'1',name:'xxxx',Battery:'100%',Booked:'TRUE'});
    firebase.database().ref('userinfos/'+this.ofAuth.auth.currentUser.uid).set({
      lat:location.coords.latitude,
      lng:location.coords.longitude,
      gender:'M',
      age:25
    });
     firebase.database().ref('preference_relation/' + this.ofAuth.auth.currentUser.uid).on('value',data =>{
        if(data.val()) {
          start_agepre = data.val().startage;
          end_agepre = data.val().endage;
         // distancepre = data.val().distance;
          gender = "M";
        }
        else
        {
          //please input preference
        }
      });
    //here we can get locations of people on google map by using geofire
                   

    firebase.database().ref('userinfos/').on('value',data => {
       this.deleteMarker();
         data.forEach( item => 
         {
            if(item.val().gender == gender)
            {
              if((item.val().age>=start_agepre)&&(item.val().age<=end_agepre))
              {
                this.createMarker(item.val().lat,item.val().lng,item.key);
              }

              
            }
          // if (item.val().Booked=="TRUE"){// && !addedMarkers[item.key]){ //TRUE MEANS NOREPORTED
          //   console.log("keey", item.key)
          //   this.createMarker(item.val().lat,item.val().lng,item.val().Booked, item.key);
        //  }
            // service.nearbySearch({
            // location: {lat: item.val().lat, lng: item.val().lng},
            // radius: 1000,
            // type: ['store']
            // }, (results,status) => 
            // {
            //   if (status === google.maps.places.PlacesServiceStatus.OK) {
            //     for (var i = 0; i < results.length; i++) {
            //         this.createMarker(results[i],item.val().lat,item.val().lng);
            //     }
            //   }
            // });
         });
    })
  }, (error) => {
    console.log(error);
    }, options);
       // $("#headerbar").hide();

  }


  //this is function which create marker where you want
  createMarker(mylat,mylng,id) {
   // var placeLoc = place.geometry.location;
    var marker;
    marker = new google.maps.Marker({
      map: map,
      position: {lat: mylat, lng: mylng},
      icon: {
        url: 'https://firebasestorage.googleapis.com/v0/b/mobiledatingapp.appspot.com/o/markerpng.png?alt=media&token=5fdc29e8-2041-4ae8-a71f-9468a5762aa0'
      }
    });
    markers.push(marker);
    uid_temp = id;
    google.maps.event.addListener(marker, 'click', function() {
     // var htmllat = marker.getPosition().lat();
      //var htmllng = marker.getPosition().lng();
     // $("#headerbar").show();
      selectedUid = uid_temp;

    });
    

  }
  deleteMarker = function () {
    for(var i = 0; i < markers.length; i++ )
        markers[i].setMap(null);
}
   addYourLocationButton (map, marker) 
  {
    var controlDiv = document.createElement('div');

    var firstChild = document.createElement('button');
    firstChild.style.backgroundColor = '#fff';
    firstChild.style.border = 'none';
    firstChild.style.outline = 'none';
    firstChild.style.width = '28px';
    firstChild.style.height = '28px';
    firstChild.style.borderRadius = '2px';
    firstChild.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    firstChild.style.cursor = 'pointer';
    firstChild.style.marginRight = '10px';
    firstChild.style.padding = '0';
    firstChild.title = 'Your Location';
    controlDiv.appendChild(firstChild);

    var secondChild = document.createElement('div');
    secondChild.style.margin = '5px';
    secondChild.style.width = '18px';
    secondChild.style.height = '18px';
    secondChild.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
    secondChild.style.backgroundSize = '180px 18px';
    secondChild.style.backgroundPosition = '0 0';
    secondChild.style.backgroundRepeat = 'no-repeat';
    firstChild.appendChild(secondChild);

    google.maps.event.addListener(map, 'center_changed', function () {
        secondChild.style['background-position'] = '0 0';
    });

    firstChild.addEventListener('click', function () {
        var imgX = 0,
            animationInterval = setInterval(function () {
                imgX = -imgX - 18 ;
                secondChild.style['background-position'] = imgX+'px 0';
            }, 500);

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(latlng);
                clearInterval(animationInterval);
                secondChild.style['background-position'] = '-144px 0';
            });
        } else {
            clearInterval(animationInterval);
            secondChild.style['background-position'] = '0 0';
        }
    });

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);
  }
  onRequest()
  {
      this.fdb.list('notification_vm/'+selectedUid).push({
        email:this.ofAuth.auth.currentUser.email
      });
     
  }

}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform,IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'
//import { AngularFireAuth } from "angularfire2/auth";

import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

declare var google;
let map: any;
let infowindow: any;
var markers = [];
//let selectedID;
var bookedflags = [];
let options = 
{
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};
@IonicPage()

@Component({
  selector: 'page-essen',
  templateUrl: 'essen.html'
})

export class EssenPage 
{
 htmllat: any;
  htmllng: any;
  distancemap: any;
  afdb : any;

@ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public platform: Platform, public geolocation: Geolocation, public fdb: AngularFireDatabase) 
  {

    platform.ready().then(() => {
      this.initMap();
    });
  }
  initMap() 
  {
    //$("#headerbar").hide();

   // var myplace = {lat: 40.1167, lng: -124.3833};

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

    //google.maps.infoWindow is a function which creates infowindow when I click marker
    infowindow = new google.maps.InfoWindow();

    //google.maps.places.PlacesService is a function which present us place service for example nearby buildings...
   // var service = new google.maps.places.PlacesService(map);

    this.fdb.list('people').push({lat:location.coords.latitude,lng:location.coords.longitude,id:'1',name:'xxxx',Battery:'100%',Booked:'TRUE'});


    //here we can get locations of people on google map by using geofire
    firebase.database().ref('people/').on('value',data => {
        console.log(data);
         data.forEach( item => 
         {
          if (item.val().Booked=="TRUE"){// && !addedMarkers[item.key]){ //TRUE MEANS NOREPORTED
            console.log("keey", item.key)
            this.createMarker(item.val().lat,item.val().lng,item.val().Booked, item.key);
          }
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
  }


  //this is function which create marker where you want
  createMarker(mylat,mylng,booked,id) {
   // var placeLoc = place.geometry.location;
    var marker;
    marker = new google.maps.Marker({
      map: map,
      position: {lat: mylat, lng: mylng},
      icon: {
        url: 'https://firebasestorage.googleapis.com/v0/b/mobiledatingapp.appspot.com/o/limescooter.png?alt=media&token=b7a30730-90a2-49a2-8337-02ac6329f46c'
      }
    });
   // selectedID = id;
    markers.push(marker);
    bookedflags.push(booked);
    google.maps.event.addListener(marker, 'click', function() {
    //  var htmllat = marker.getPosition().lat();
      // markerlat=marker.getPosition().lat();
      // markerlng=marker.getPosition().lng();
     // var htmllng = marker.getPosition().lng();
      // $("#headerbar").show();
      // $("#lat").text(htmllat);
      // $("#lng").text(htmllng);
      infowindow.setContent("<ul style='list-style-type:none;margin-left:-40px'><li><img style='margin-top:3px;padding-right:5px;width:29px;height:17px' src='https://firebasestorage.googleapis.com/v0/b/mobiledatingapp.appspot.com/o/no_lime.png?alt=media&token=d88c8998-1506-4541-9769-fcdb22ded06b?alt=media&token=698d8eef-35f8-4cae-8fd4-dd0c64bcc923'></img><span style='margin-left:2px;'>"+"No.XXX-757"+"</span></li><li style='margin-top:6px;margin-left:3px'><img style='width:20px;height:27px;padding-right:5px;margin-left:2px;' src='https://firebasestorage.googleapis.com/v0/b/mobiledatingapp.appspot.com/o/battery_lime.png?alt=media&token=698d8eef-35f8-4cae-8fd4-dd0c64bcc923'></img><span style='margin-left:7px'>"+"35km Range"+"</span></li></ul>");
      infowindow.open(map, this);
    

    });
     google.maps.event.addListener(infowindow,'closeclick',function(){
       // $("#headerbar").hide();
       //currentmarker.setMap(null);
       // map.removeMarker(currentmarker);

   });
    

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

}

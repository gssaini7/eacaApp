import { Component } from '@angular/core';

import { ToastController } from 'ionic-angular';
import {
    GoogleMaps,
    GoogleMap,
    GoogleMapsEvent,
    Marker,
    GoogleMapsAnimation,
    MyLocation
} from '@ionic-native/google-maps';



@Component({
    selector: 'page-gpstracker',
    templateUrl: 'gpstracker.html'
})
export class GpstrackerPage {
    map: GoogleMap;

    constructor(public toastCtrl: ToastController) {
        
    }
    ionViewDidLoad() {
        this.loadMap();
    }

  

    //loadMap() {
    //    this.map = GoogleMaps.create('map_canvas', {
    //        camera: {
    //            target: {
    //                lat: 43.0741704,
    //                lng: -89.3809802
    //            },
    //            zoom: 18,
    //            tilt: 30
    //        }
    //    });

    //}
    loadMap() {
     
        // This code is necessary for browser
        //Environment.setEnv({
        //    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBeu5HOizKdqU6_gcEhatRYF5hFTU4-_MA',
        //    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBeu5HOizKdqU6_gcEhatRYF5hFTU4-_MA'
        //});

        //Environment.setEnv({
        //    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD-0in-8RuglUguju3cPD70hWZAOZ7BunY',
        //    'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyD-0in-8RuglUguju3cPD70hWZAOZ7BunY'
        //});

        this.map = GoogleMaps.create('map_canvasa', {
            camera: {
                target: {
                    lat: 43.0741704,
                    lng: -89.3809802
                },
                zoom: 18,
                tilt: 30
            }
        });

        //let mapOptions: GoogleMapOptions = {
            
        //    camera: {
        //        target: {
        //            lat: 30.6879815,
        //            lng: 76.7016996
        //        },
        //        zoom: 16,
        //        tilt: 30
        //    }
            
        //};

        //this.map = GoogleMaps.create('map_canvas', mapOptions);

        //let marker: Marker = this.map.addMarkerSync({
        //    title: 'Ionic',
        //    icon: 'blue',
        //    animation: 'DROP',
        //    position: {
        //        lat: 43.0741704,
        //        lng: -89.3809802
        //    }
        //});
        //marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //    alert('clicked');
        //});
    }

    onButtonClick() {
       
        this.map.clear();

        

        // Get the location of you
        this.map.getMyLocation()
            .then((location: MyLocation) => {
                console.log(JSON.stringify(location, null, 2));
                alert(JSON.stringify(location, null, 2));
                // Move the map camera to the location with animation
                this.map.animateCamera({
                    target: location.latLng,
                    zoom: 17,
                    tilt: 30
                })
                    .then(() => {
                        // add a marker
                        let marker: Marker = this.map.addMarkerSync({
                            title: '@ionic-native/google-maps plugin!',
                            snippet: 'This plugin is awesome!',
                            position: location.latLng,
                            animation: GoogleMapsAnimation.BOUNCE
                        });

                        // show the infoWindow
                        marker.showInfoWindow();

                        // If clicked it, display the alert
                        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                            this.showToast('clicked!');
                        });
                    });
            });
    }

    showToast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 2000,
            position: 'middle'
        });

        toast.present(toast);
    }
  
}

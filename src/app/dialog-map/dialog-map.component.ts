import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { DateAdapter } from '@angular/material/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-dialog-map',
  templateUrl: './dialog-map.component.html',
  styleUrls: ['./dialog-map.component.scss'],
})
export class DialogMapComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap | undefined;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow | undefined;

  zoom = 12;
  markers: any = [];
  infoContent: String = '';
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  };

  geolocation: any = {};

  constructor(
    private _apiService: ApiService,
    private _webSocketService: WebsocketService,
    @Inject(MAT_DIALOG_DATA) public params: any
  ) {}

  initMaps() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  getLocationByPollsterId(id: number) {
    this._apiService.getPollsterById(id).subscribe({
      next: (res: any) => {
        let { Latitude, Longitude, Names, Lastnames } = res;
        this.geolocation = {
          Latitude,
          Longitude,
          PollsterFullname: `${Names} ${Lastnames}`,
        };
        console.log(this.geolocation);
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    this._webSocketService.listen('topicLocation').subscribe((data: any) => {
      console.log(data);
      this.markers = [];
      this.geolocation.Latitude = data.newLatitude;
      this.geolocation.Longitude = data.newLongitude;

      this.addMarker();
    });
    let { id = 0 } = this.params;
    this.initMaps();
    this.getLocationByPollsterId(id);
  }

  zoomIn() {
    if (this.options.maxZoom) {
      if (this.zoom < this.options.maxZoom) {
        this.zoom++;
      }
    }
  }

  click(event: google.maps.MapMouseEvent) {
    console.log(event);
  }

  zoomOut() {
    if (this.options.minZoom) {
      if (this.zoom > this.options.minZoom) {
        this.zoom--;
      }
    }
  }
  logCenter() {
    console.log(JSON.stringify(this.map?.getCenter()));
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.geolocation.Latitude,
        lng: this.geolocation.Longitude,
      },
      /* position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      }, */
      label: {
        color: 'black',
        text: this.geolocation.PollsterFullname,
      },
      title: 'Ubicacion actual',
      //title: 'Marker title ' + (this.markers.length + 1),
      info: 'Ubicacion actual',
      //info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  openInfo(marker: MapMarker | undefined, content: String) {
    this.infoContent = content;
    this.info?.open(marker);
  }
}

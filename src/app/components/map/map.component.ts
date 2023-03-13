import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { PlacesService } from '../../services/places.cervice';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit  {
  constructor(private placeSvc: PlacesService) {

  }

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 12,
      })
    ],
    zoom: 10,
    center: L.latLng(55.7522200, 37.6155600),
    attributionControl: false
  }

  ngAfterViewInit() {
    const map = new L.Map('map').setView([55.7522200, 37.6155600], 10)
  }
  ngOnInit() {
    console.log(this.placeSvc);
     
  }
}

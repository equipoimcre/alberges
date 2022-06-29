import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { tileLayer, map, Map, featureGroup, marker, Marker }from 'leaflet';
import {LeafletLayer} from 'deck.gl-leaflet';
import {MapView} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import { Paginable } from '../../../../../../interface/paginable';
import { ShelterDto } from 'shelter-evaluation-dto';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-shelter-map',
  templateUrl: './shelter-map.component.html',
  styleUrls: ['./shelter-map.component.scss']
})
export class ShelterMapComponent implements AfterViewInit {

  @ViewChild('map')
  mapContainer!: ElementRef<HTMLElement>;

  map!: Map;

  private _paginableShelter: Paginable<ShelterDto> = {count: 0, data: []};
  private markerList: Marker<any>[] = [];

  constructor(private deviceDetectorService: DeviceDetectorService) {}

  @Input()
  set paginableShelter(value: Paginable<ShelterDto>) {
    this._paginableShelter = value;
    this.addMarkers();
  }
  
  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = map(this.mapContainer.nativeElement, {
      center: [40.2085, -3.713],
      zoom: this.deviceDetectorService.isMobile() ? 4 : 6,
      });
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
  
      const deckLayer = new LeafletLayer({
      views: [
        new MapView({
          repeat: true
        })
      ],
      layers: []
      });
      this.map.addLayer(deckLayer);
      this.addMarkers();
  }

  private addMarkers() {    
    if (this._paginableShelter.data.length > 0) {
      this.markerList.forEach(marker => marker.remove())
      this.markerList = [];
      const group = featureGroup();
      this._paginableShelter.data.forEach(shelter => {
        const markerAux = marker([(shelter.coordinate as any).coordinates[0], (shelter.coordinate as any).coordinates[1]]);
        markerAux.bindPopup(`<p>${shelter.name}</p>`)
        this.markerList.push(markerAux)
        group.addLayer(markerAux);
      })
      this.map.addLayer(group);
    }
  }
}

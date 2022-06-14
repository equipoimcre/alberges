import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShelterDto } from 'shelter-evaluation-dto';

@Component({
  selector: 'app-shelter-info',
  templateUrl: './shelter-info.component.html',
  styleUrls: ['./shelter-info.component.scss']
})
export class ShelterInfoComponent implements OnInit {

  shelterDto: ShelterDto | undefined;

  constructor(
    private activeRoute: ActivatedRoute, 
  ) { }

  ngOnInit(): void {
    this.shelterDto = this.activeRoute.snapshot.data.shelter;
  }

}

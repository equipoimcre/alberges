import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunityDto, ProvinceDto } from 'shelter-evaluation-dto';

@Component({
  selector: 'app-shelter-form',
  templateUrl: './shelter-form.component.html',
  styleUrls: ['./shelter-form.component.scss']
})
export class ShelterFormComponent implements OnInit {

  @Input()
  public validateMode = false;

  shelterForm!: FormGroup;
  communityList: CommunityDto[] = [];
  provinceList: ProvinceDto[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.initShelterForm();
    this.communityList = this.activeRoute.snapshot.data.communityList;
  }

  submitShelter() {
    if (this.shelterForm.valid) {

    } else {
      alert('Fill all data and response all the questions')
    }
  }

  changeCommunity(communitId: string | null) {
    const communityDto = this.findCommunityDto(communitId!);
    if (communityDto) {
      this.provinceList = communityDto.provinceList;
    } else {
      this.provinceList = [];
    }
  }

  private findCommunityDto (id: string) {
    return this.communityList.find(community => community.id === parseInt(id));
  }

  private initShelterForm() {
    const controls: {[key: string]: AbstractControl} = {
      communityId: new FormControl(null, [Validators.required]),
      provinceId: new FormControl(null, [Validators.required]),
      municipality: new FormControl(null, [Validators.required]),
      owner: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      longitude: new FormControl(null, [Validators.required]),
      latitude: new FormControl(null, [Validators.required]),
    }
    if (this.validateMode) {
      controls.validate = new FormControl(null, [Validators.required]);
    }
    this.shelterForm = new FormGroup(controls);
  }

}

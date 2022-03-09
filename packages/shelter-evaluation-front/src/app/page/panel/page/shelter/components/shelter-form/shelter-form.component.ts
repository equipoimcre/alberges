import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunityDto, ProvinceDto, QuestionDto, ShelterDto, ShelterResponseDto } from 'shelter-evaluation-dto';
import { StorageOptions } from '../../../../../../service/storage/storage.options';
import { ShelterService } from '../../../../../../package/shelter-evaluation-api/service';
import { StorageService } from '../../../../../../service/storage/storage.service';

@Component({
  selector: 'app-shelter-form',
  templateUrl: './shelter-form.component.html',
  styleUrls: ['./shelter-form.component.scss'],
})
export class ShelterFormComponent implements OnInit {
  @Input()
  public validateMode = false;
  @Input()
  public displayMode = false;

  shelterForm!: FormGroup;
  communityList: CommunityDto[] = [];
  provinceList: ProvinceDto[] = [];
  questionList: QuestionDto[] = [];
  shelterDto: ShelterDto | undefined = undefined;

  private STORAGE_KEY = 'SHELTER_CREATE';
 
  constructor(
    private activeRoute: ActivatedRoute, 
    private shelterService: ShelterService, 
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.communityList = this.activeRoute.snapshot.data.communityList;
    this.questionList = this.activeRoute.snapshot.data.questionList;
    this.shelterDto = this.activeRoute.snapshot.data.shelter;
    this.initShelterForm();
    if (this.validateMode === false && this.displayMode === false) {
      this.storeAllChanges();
      this.fillFormIFThereIsData();
      this.getLocation();
    } else if (this.shelterDto) {
      this.communityList = [this.shelterDto.community];
      this.changeCommunity(this.shelterDto.community.id.toString());
    }
  }

  submitShelter() {
    if (this.validateMode && this.shelterDto) {
      this.shelterService.validate(this.shelterDto.id!).subscribe(
        () => {
          alert($localize `:@@shelter.alert.validate:Shelter validated`)
        },
        error => alert(JSON.stringify(error)),
      )
    } else {
      if (this.shelterForm.valid) {
        const formValues = this.shelterForm.value;
        const shelterDto: ShelterDto = {
          id: undefined,
          owner: formValues.owner,
          name: formValues.name,
          note: formValues.note,
          municipality: formValues.municipality,
          community: this.findCommunityDto(formValues.communityId)!,
          province: this.findProvinceDto(formValues.provinceId)!,
          shelterResponseList: this.getShelterResponse(),
          validate: false,
          coordinate: {
            type: 'Point',
            coordinates: [formValues.latitude, formValues.longitude]
          },        
        }
        this.shelterService.create(shelterDto).subscribe(
          response => {
            this.shelterForm.reset();
            this.storageService.remove(this.STORAGE_KEY, new StorageOptions(true));
            alert($localize `:@@shelter.alert.created:Shelter created successfully`);
            
          },
          errror => alert(JSON.stringify(errror)),
        )
      } else {
        alert($localize `:@@shelter.alert.fill:Fill all data and response all the questions`);
      }
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

  private findCommunityDto(id: string) {
    return this.communityList.find(
      (community) => community.id === parseInt(id),
    );
  }

  private findProvinceDto(id: string) {
    return this.provinceList.find(province => province.id === parseInt(id))
  }

  private initShelterForm() {
    const controls: { [key: string]: AbstractControl } = {
      communityId: new FormControl(this.shelterDto?.community.id, [Validators.required]),
      provinceId: new FormControl(this.shelterDto?.province.id, [Validators.required]),
      municipality: new FormControl(this.shelterDto?.municipality, [Validators.required]),
      owner: new FormControl(this.shelterDto?.owner, [Validators.required]),
      name: new FormControl(this.shelterDto?.name, [Validators.required]),
      longitude: new FormControl((this.shelterDto?.coordinate as any)?.coordinates[0], [Validators.required]),
      latitude: new FormControl((this.shelterDto?.coordinate as any)?.coordinates[1], [Validators.required]),
      note: new FormControl(this.shelterDto?.note),
    };
    if (this.validateMode) {
      controls.validate = new FormControl(this.shelterDto?.validate, [Validators.required]);
    }
    if (this.questionList.length > 0) {
      this.questionList.forEach(question => {
        let response = false;
        if (this.shelterDto) {
          const shelterResponse = this.shelterDto.shelterResponseList.find( shelterResponse => shelterResponse.questionId === question.id );
          if (shelterResponse) {
            response = shelterResponse.response;
          }
        }
        controls[`question-${question.id}`] = new FormControl(response, [Validators.required]);
      })
    }
    this.shelterForm = new FormGroup(controls);
  }

  private getShelterResponse() {
    return Object.keys(this.shelterForm.value)
      .filter(key => key.match(/question-.*/))
      .map(key => {
        const id = parseInt(key.slice(9));
        return {
          shelterId: undefined,
          questionId: id,
          response: this.shelterForm.value[key]
        } as ShelterResponseDto
      });
  }

  private fillFormIFThereIsData() {
    const data = this.storageService.get(this.STORAGE_KEY, new StorageOptions(true));
    if (data) {
      const json = JSON.parse(data);
      Object.keys(json).forEach(key => {
        this.shelterForm.controls[key].setValue(json[key]);
      })
    }
  }

  private storeAllChanges() {
    this.shelterForm.valueChanges.subscribe(val => {
      this.storageService.save(this.STORAGE_KEY, JSON.stringify(val), new StorageOptions(true))
    });
    this.shelterForm.controls.communityId.valueChanges.subscribe(val => this.changeCommunity(val));
  }

  private getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.shelterForm.setValue({
          ...this.shelterForm.value,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      });
    }
  }
}

import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';

import { GlobalConstants } from '../../../common/global-constants';
import { TravelService } from '../../../services/travel.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormControlName } from '@angular/forms';
import { Travel } from '../../../models/travel';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-travel-add',
  templateUrl: './travel-add.component.html',
  styleUrls: ['./travel-add.component.css'],
  providers: [TravelService]
})
export class TravelAddComponent implements OnInit {
  public Editor = ClassicEditor;
  constructor(private travelService: TravelService,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router

  ) { }

  travel: any = {};
  baseUrl: string = GlobalConstants.apiURL;
  travelAddForm: FormGroup;
  ngOnInit() {

    if (!this.authService.signedin()) {
      this.router.navigateByUrl('');
    }
    this.createTravelForm();
  }

  createTravelForm() {
    this.travelAddForm = this.formBuilder.group({
      name: new FormControl(this.travel.name, [Validators.required]),
      description: new FormControl(this.travel.description, [Validators.required]),
      location: new FormControl(this.travel.location, [Validators.required]),
      note: new FormControl(this.travel.note)
    });

  }
  add() {
    if (this.travelAddForm.valid) {


      this.travel = Object.assign({}, this.travelAddForm.value);


      this.travelService.addTravel(this.travel);

    }
  }

}


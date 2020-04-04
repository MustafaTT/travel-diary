import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { TravelService } from '../../../services/travel.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalConstants } from '../../../common/global-constants';
import { Travel } from '../../../models/travel';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-user-travel',
  templateUrl: './user-travel.component.html',
  styleUrls: ['./user-travel.component.css']
})
export class UserTravelComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;


  constructor(private travelService: TravelService,
              private modalService: BsModalService,
              private authService: AuthService,
              private router: Router) { }
  travels: Travel[];
  baseUrl: string = GlobalConstants.apiURL;
  ngOnInit() {
    if (!this.authService.signedin()) {
      this.router.navigateByUrl('');
    }
    
    this.getUserTravels();
  }

  getUserTravels() {
    this.travelService.getTravelsByUser().subscribe(data => {

      this.travels = data;
    });
  }
  deleteTravel(travelId) {


    this.travelService.deleteTravelById(travelId);
    this.modalRef.hide();


  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }
}

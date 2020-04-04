import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { GlobalConstants } from '../../common/global-constants';
import { TravelService } from '../../services/travel.service';
import { Component, OnInit } from '@angular/core';
import { Travel } from '../../models/travel';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css'],
  providers: [TravelService]
})
export class TravelComponent implements OnInit {

  constructor(private travelService: TravelService,
              private authService: AuthService, 
              private router: Router) { } 
  travels: Travel[];
  baseUrl: string = GlobalConstants.apiURL;
  ngOnInit() {
    if (!this.authService.signedin()){
      this.router.navigateByUrl('');
    }
    this.travelService.getTravels().subscribe(data => {
     
      this.travels = data;
    });

   

  }

  get isAuthenticated() {
    return this.authService.signedin();
  }

}

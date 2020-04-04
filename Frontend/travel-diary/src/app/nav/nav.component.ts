import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [AuthService]
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }
  
  signinUser: any = {};
  ngOnInit(): void {

      }

  signin() {
    this.authService.signin(this.signinUser);
  }

  signout() {
    this.authService.signout();
  }

  get isAuthenticated() {
    return this.authService.signedin();
  }
  getUserName(): string {
    return this.authService.getCurrentUserName();

  }
}

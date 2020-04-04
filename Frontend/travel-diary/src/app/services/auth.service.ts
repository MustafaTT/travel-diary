import { GlobalConstants } from 'src/app/common/global-constants';
import { AlertifyService } from './alertify.service';
import { Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { SigninUser } from '../models/signinUser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { SignupUser } from '../models/signupUser';

@Injectable()
export class AuthService {
    



    constructor(private httpClient: HttpClient,
                private jwtHelper: JwtHelperService,
                private router: Router,
                private alertifyService: AlertifyService) { }

    path = GlobalConstants.apiURL+'/traveldiaryapp/';
    userToken: any;
    decodedToken: any;
    success: boolean = false;
    TOKEN = 'token';
    signin(signinUser: SigninUser) {
        // let headers = new HttpHeaders();
        // headers = headers.append('Content-Type', 'application/json');

        this.httpClient.post(this.path + 'signin', signinUser)
            .subscribe(data => {
                this.saveToken(data['access_token']);
                this.userToken = data['access_token'];
                this.decodedToken = this.jwtHelper.decodeToken(data['access_token']);
                this.alertifyService.success('Welcome ' + this.getCurrentUserName() );
                this.router.navigateByUrl('/travels');}
                ,
            error => this.alertifyService.error('User information or password is invalid'));
            

    }

    saveToken(token) {
        localStorage.setItem(this.TOKEN, token);

    }

    signup(signupUser: SignupUser) {


        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');
        this.httpClient.post(this.path + 'signup', signupUser, { headers })
            .subscribe(data => {
                
                this.success = true;
                this.signin(signupUser);
                this.alertifyService.success('User Registered Succesfully');
                
             }
             ,
             error => this.alertifyService.error('User may already exist'));



    }

    signout() {

        localStorage.removeItem(this.TOKEN);
        this.router.navigateByUrl('/signup');

    }

    signedin() {


        return !this.jwtHelper.isTokenExpired(localStorage.getItem(this.TOKEN));
    }

    getUserToken() {

        return localStorage.getItem(this.TOKEN);
    }


    getCurrentUserId() {
        return this.jwtHelper.decodeToken(localStorage.getItem(this.TOKEN)).nameid;
    }
    getCurrentUserName() {
        return this.jwtHelper.decodeToken(localStorage.getItem(this.TOKEN)).username;
    }

}

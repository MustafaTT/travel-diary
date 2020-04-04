import { AuthService } from './services/auth.service';
import { PhotoComponent } from './photo/photo.component';
import { TravelEditComponent } from './travels/user-travels/travel-edit/travel-edit.component';
import { UserTravelComponent } from './travels/user-travels/user-travel/user-travel.component';

import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TravelComponent } from './travels/travel/travel.component';
import { appRoutes } from './routes';
import { TravelDetailComponent } from './travels/travel-detail/travel-detail.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TravelAddComponent } from './travels/user-travels/travel-add/travel-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { SignupComponent } from './signup/signup.component';
import { AlertifyService } from './services/alertify.service';
import { ModalModule } from 'ngx-bootstrap';
import { NgxUploaderModule } from 'ngx-uploader';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      TravelComponent,
      UserTravelComponent,
      TravelDetailComponent,
      TravelEditComponent,
      TravelAddComponent,
      SignupComponent,
      PhotoComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      NgxGalleryModule,
      FormsModule,
      JwtModule,
      FormsModule,
      NgxUploaderModule,
      CKEditorModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      ModalModule.forRoot(),

   ],
   providers: [
      { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
      JwtHelperService,
      AlertifyService,
      AuthService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

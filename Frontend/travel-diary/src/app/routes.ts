import { AppComponent } from './app.component';
import { TravelEditComponent } from './travels/user-travels/travel-edit/travel-edit.component';
import { TravelDetailComponent } from './travels/travel-detail/travel-detail.component';
import { TravelComponent } from './travels/travel/travel.component';
import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { TravelAddComponent } from './travels/user-travels/travel-add/travel-add.component';
import { UserTravelComponent } from './travels/user-travels/user-travel/user-travel.component';

export const appRoutes : Routes = [
    {path: 'travels', component : TravelComponent },
    {path: 'userTravels', component : UserTravelComponent },
    {path: 'signup', component : SignupComponent },
    {path: 'travelAdd', component : TravelAddComponent },
    {path: 'travelDetail/:travelId', component : TravelDetailComponent },
    {path: 'travelEdit/:travelId', component : TravelEditComponent },
    {path: '**', redirectTo: 'signup', pathMatch: 'full'}




];



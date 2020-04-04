import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Travel } from '../models/travel';
import { Photo } from '../models/photo';
import { AlertifyService } from './alertify.service';
import { Router } from '@angular/router';
import { GlobalConstants } from '../common/global-constants';
@Injectable({
    providedIn: 'root'
}
)
export class TravelService {

    constructor(private httpClient: HttpClient,
        private alertifyService: AlertifyService,
        private router: Router) { }

    baseURL: string = GlobalConstants.apiURL;
    path = this.baseURL + '/traveldiaryapp/';

    getTravels(): Observable<Travel[]> {

        return this.httpClient.get<Travel[]>(this.path + 'travels/',
            { headers: { Authorization: 'Bearer' + ' ' + localStorage.getItem('token') } });
    }
    getTravelsByUser(): Observable<Travel[]> {

        return this.httpClient.get<Travel[]>(this.path + 'usertravels/',
            { headers: { Authorization: 'Bearer' + ' ' + localStorage.getItem('token') } });
    }
    getTravelById(travelId): Observable<Travel> {
        return this.httpClient.get<Travel>(this.path + 'travel/' + travelId,
            { headers: { Authorization: 'Bearer' + ' ' + localStorage.getItem('token') } });
    }
    getPhotosByTravel(travelId): Observable<Photo[]> {
        return this.httpClient.get<Photo[]>(this.path + 'photos/' + travelId,
            { headers: { Authorization: 'Bearer' + ' ' + localStorage.getItem('token') } });
    }
    addTravel(travel: Travel) {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json')
            .append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));

        this.httpClient.post(this.path + 'usertravels/', travel,
            { headers }).subscribe(
                data => {
                    this.alertifyService.success('Travel SucceSsfully Added');
                    this.router.navigateByUrl('/travelEdit/' + data['id'])

                }
                ,
                error => this.alertifyService.error('Travel could not created.'));




    }
    updateTravel(travelId, travel: Travel) {


        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json')
            .append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
        this.httpClient.put(this.path + 'usertravels/' + travelId, travel,
            { headers }).subscribe(
                data => {
                    this.alertifyService.success('Travel Succesfully Updated');
                    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/travelEdit/' + travelId]);
                    })
                }, error => this.alertifyService.error('Travel could not updated.'));




    }



    deleteTravelById(travelId: number) {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json')
            .append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
        this.httpClient.delete(this.path + 'usertravels/' + travelId,
            { headers }).subscribe(
                data => {
                    this.alertifyService.success('Travel Succesfully Deleted');
                    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['userTravels']);
                    })
                },
                error => this.alertifyService.error('Travel could not deleted.'));

    }





    deletePhotoById(travelId, photoId) {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json')
            .append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
        this.httpClient.delete(this.path + 'editphoto/' + travelId + "/" + photoId,
            { headers }).subscribe(
                data => {
                    this.alertifyService.success('Photo Succesfully Deleted');
                    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/travelEdit/' + travelId]);
                    }, error => this.alertifyService.error('Photo could not deleted.'));

                }
            );




    }

    setMainPhotoById(travelId, photoId) {

        let headers = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json')
            .append('Authorization', 'Bearer' + ' ' + localStorage.getItem('token'));
        this.httpClient.put(this.path + 'editphoto/' + travelId + '/' + photoId, null,
            { headers }).subscribe(
                data => {
                    this.alertifyService.success('Photo Succesfully Assigned As Main');
                    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
                        this.router.navigate(['/travelEdit/' + travelId]);
                    }, error => this.alertifyService.error('Photo could not assigned.'));

                }
            );




    }





}



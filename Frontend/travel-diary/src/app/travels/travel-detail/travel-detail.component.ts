import { AuthService } from './../../services/auth.service';
import { Photo } from '../../models/photo';
import { TravelService } from '../../services/travel.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Travel } from '../../models/travel';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { GlobalConstants } from '../../common/global-constants';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.css'],
  providers: [TravelService]
})
export class TravelDetailComponent implements OnInit {

  constructor(protected activatedRoute: ActivatedRoute, protected travelService: TravelService) { }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  travel: Travel;
  photos: Photo[];
  baseUrl: string = GlobalConstants.apiURL;
  public Editor = ClassicEditor.setReadOnly;
  
  ngOnInit() {

 

    this.activatedRoute.params.subscribe(params => {

      this.getTravelById(params['travelId'])
      this.getPhotosByTravel(params['travelId'])
    });

  }


  protected getTravelById(travelId) {
    this.travelService.getTravelById(travelId).subscribe(data => {

      this.travel = data;


    });

  }
  protected getPhotosByTravel(travelId) {
    this.travelService.getPhotosByTravel(travelId).subscribe(data => {
      this.photos = data;

      this.setGallery();

    });

  }

  protected getImages() {
    const imageUrls = [];

    for (let i = 0; i < this.photos.length; i++) {

      imageUrls.push({
        small: this.baseUrl + this.photos[i].image,
        medium: this.baseUrl + this.photos[i].image,
        big: this.baseUrl + this.photos[i].image,
        description: this.photos[i].id
      })
    }
    return imageUrls;

  }
  protected setGallery() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '800px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = this.getImages();




  }
 

}

import { ActivatedRoute, Router } from '@angular/router';

import { Component, OnInit, TemplateRef, ElementRef } from '@angular/core';
import { TravelService } from './../../../services/travel.service';
import { TravelDetailComponent } from '../../travel-detail/travel-detail.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalConstants } from 'src/app/common/global-constants';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-travel-edit',
  templateUrl: './travel-edit.component.html',
  styleUrls: ['./travel-edit.component.css'],

})
export class TravelEditComponent extends TravelDetailComponent implements OnInit {
  modalRef: BsModalRef;
  message: string;
  travel: any = {};
  baseUrl: string = GlobalConstants.apiURL;
  travelAddForm: FormGroup;
  public Editor = ClassicEditor;
  currentTravel: any;
  constructor(private formBuilder: FormBuilder, private router: Router,
    activatedRoute: ActivatedRoute, travelService: TravelService,
    private modalService: BsModalService) {
    super(activatedRoute, travelService);


  }


  ngOnInit() {
  
    
    this.loadPageData();
    
    
   
  

    
  }

  loadPageData() {
    this.activatedRoute.params.subscribe(params => {
      this.getTravelById(params['travelId'])
      this.getPhotosByTravel(params['travelId'])
      this.createTravelForm();

      this.modalService.onHide.subscribe(() => {
        this.showIcons();
        this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/travelEdit/' + params['travelId']]);
        });
    });
    this.modalService.onShow.subscribe(() => {
      this.hideIcons();
  });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
    
  }
  closeModal(): void {

    this.message = 'Closed!';
    this.modalRef.hide();
  
  }


  createTravelForm() {
    this.travelAddForm = this.formBuilder.group({
      name: new FormControl(this.travel.name, [Validators.required]),
      description: new FormControl(this.travel.description, [Validators.required]),
      location: new FormControl(this.travel.location, [Validators.required]),
      note: new FormControl(this.travel.note, [Validators.required])
    });

  }
  update(travelId) {
    if (this.travelAddForm.valid) {


      this.travel = Object.assign({}, this.travelAddForm.value);


      this.travelService.updateTravel(travelId, this.travel);
      this.loadPageData();

    }
  }
  protected setGallery() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '800px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        thumbnailActions: [{ icon: 'fa fa-trash', onClick: this.deleteImage.bind(this), titleText: 'delete' },
        { icon: 'fa fa-check-circle', onClick: this.setMainImage.bind(this), titleText: 'set' }],
        imageActions: [{ icon: 'fa fa-trash ', onClick: this.deleteImage.bind(this), titleText: 'delete' },
        { icon: 'fa fa-check-circle', onClick: this.setMainImage.bind(this), titleText: 'set' }
        ]
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
  deleteImage(event, index): void {

    this.activatedRoute.params.subscribe(params => {
      
      this.travelService.deletePhotoById(params['travelId'], this.galleryImages[index].description);

    });
  }

  setMainImage(event, index): void {
    this.activatedRoute.params.subscribe(params => {
      
      this.travelService.setMainPhotoById(params['travelId'], this.galleryImages[index].description);

    });


  }

  hideIcons() {
    const trash = document.getElementsByClassName('fa-trash') as HTMLCollectionOf<HTMLElement>;
    const check = document.getElementsByClassName('fa-check-circle') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0;  i < trash.length ; i++) {

      trash[i].style.visibility = 'hidden';
      check[i].style.visibility = 'hidden';
    }



  }

  showIcons() {
    const trash = document.getElementsByClassName('fa-trash') as HTMLCollectionOf<HTMLElement>;
    const check = document.getElementsByClassName('fa-check-circle') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0;  i < trash.length ; i++) {

      trash[i].style.visibility = 'visible';
      check[i].style.visibility = 'visible';
    }

  }
}


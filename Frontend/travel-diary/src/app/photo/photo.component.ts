import { GlobalConstants } from '../common/global-constants';
import { Photo } from './../models/photo';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { AlertifyService } from './../services/alertify.service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';
import { Component, OnInit, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css'],

})

export class PhotoComponent implements OnInit {
  currentTravel: any;
  formData: FormData;
  files: UploadFile[];
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/bmp']
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;
  options: UploaderOptions;
  constructor(private authService: AuthService,
              private alertifyService: AlertifyService,
              private activatedRoute: ActivatedRoute,
              private router: Router

  ) {

    this.options = { concurrency: 1, maxUploads: 10, allowedContentTypes: this.allowedTypes, maxFileSize: 30000000 };
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;




  }
  photos: Photo[] = [];

  baseURL: string = GlobalConstants.apiURL;
  path: string = this.baseURL + '/traveldiaryapp/';
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.currentTravel = params['travelId']
    })

  }


  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') {
      const event: UploadInput = {
        type: 'uploadAll',
        url: this.path + 'addphoto/' + this.currentTravel,
        headers: { Authorization: 'Bearer' + ' ' + localStorage.getItem('token') },
        method: 'POST',
        data: {}
      };

      this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
      this.files.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.files[index] = output.file;
      this.alertifyService.success('Photos Succesfully Uploaded : ' + output.file.name);
   
    } else if (output.type === 'cancelled' || output.type === 'removed') {
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    } else if (output.type === 'rejected' && typeof output.file !== 'undefined') {
      console.log(output.file.name + ' rejected');
      this.alertifyService.error('Unsupported type or exceeded size  : ' + output.file.name);
    }

    this.files = this.files.filter(file => file.progress.status !== UploadStatus.Done);



  }



  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: this.path + 'addphoto/' + this.currentTravel,
      headers: { Authorization: 'Bearer' + ' ' + localStorage.getItem('token') },
      method: 'POST',
      data: {}
    };

    this.uploadInput.emit(event);
    this.alertifyService.success('Photos Succesfully Uploaded');
    this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/travelEdit/' + this.currentTravel]);
    });
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}












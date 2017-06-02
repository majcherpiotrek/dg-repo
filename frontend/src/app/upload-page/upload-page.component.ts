import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {

  private showForm = true;
  private responseJSON: JSON;
  private out = '';

  onUploadFinished(event: JSON) {
    this.responseJSON = event;
    this.out = JSON.stringify(this.responseJSON);
    this.showForm = false;
  }
  ngOnInit() {
  }

}

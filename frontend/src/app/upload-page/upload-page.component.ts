import {Component, OnInit} from '@angular/core';
import {RecordModel} from '../shared/record.model';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {

  private showForm = true;
  private responseJSON;
  private out: RecordModel;

  onUploadFinished(event: JSON) {
    this.responseJSON = event;
    console.log(<RecordModel> this.responseJSON);
    this.out = <RecordModel> this.responseJSON;
    this.showForm = false;
  }

  ngOnInit() {
  }

}

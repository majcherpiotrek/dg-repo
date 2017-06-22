import {Component, OnInit} from '@angular/core';
import {RecordDetailsModel} from '../shared/record-details.model';
import {RecordService} from '../services/record.service';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {

  private showForm = true;
  private responseJSON;
  private out: RecordDetailsModel;
  private downloadLink = 'url';

  constructor(private recordService: RecordService) {
  }

  onUploadFinished(event: JSON) {
    this.responseJSON = event;
    console.log(<RecordDetailsModel> this.responseJSON);
    this.out = <RecordDetailsModel> this.responseJSON;
    this.showForm = false;
    this.downloadLink = this.recordService.getZip(this.responseJSON.id);
    console.log('download link:' + this.downloadLink);
  }

  ngOnInit() {
  }

}

import {Component, OnInit} from '@angular/core';
import {RecordModel} from '../shared/record.model';
import {RecordService} from '../services/record.service';

@Component({
  selector: 'app-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {

  private showForm = true;
  private responseJSON;
  private out: RecordModel;
  private recordService: RecordService;
  downloadLink: string;
  // id: string;  #merq 1

  onUploadFinished(event: JSON) {
    this.responseJSON = event;
    console.log(<RecordModel> this.responseJSON);
    this.out = <RecordModel> this.responseJSON;
    this.showForm = false;
    // this.downloadLink = this.recordService.getZip(this.id);  #merq 1 - need to get id of current record
  }

  ngOnInit() {
  }

}

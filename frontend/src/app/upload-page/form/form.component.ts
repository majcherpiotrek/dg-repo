import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {RecordModel} from '../../shared/record.model';
import {CitationType} from '../../shared/citation-type';
import {RecordService} from '../../services/record.service';
import {FileHeaderModel} from '../../shared/file-header.model';
import {RecordDetailsModel} from '../../shared/record-details.model';

@Component({
  selector: 'app-form',
  providers: [RecordService],
  templateUrl: './form.component.html',
  styleUrls: [
    './form.component.css'
  ]
})
export class FormComponent implements OnInit {

  record: RecordModel;
  hasRecordInitialized = false;
  private promptRecordHeader = '1. Set new record\'s details and add files!';
  private promptCitationEdit = '2. Edit your files\' metadata!';
  showDownloadLink = false;

  @Output() uploadFinished = new EventEmitter<RecordDetailsModel | JSON>();

  constructor(private recordService: RecordService) {
    this.record = new RecordModel();
  }

  initNewRecord(event) {
    this.hasRecordInitialized = true;
  }

  newRecord(event) {
    console.log(this.record.toString());
    this.recordService.addRecord(this.record)
      .subscribe(
        (response) => {
          console.log(response);
          this.uploadFinished.emit(<RecordDetailsModel> response.json());
          alert('Succesfull upload!');
          this.showDownloadLink = !this.showDownloadLink;
        },
        (error) => {
          console.log(error);
          this.uploadFinished.emit(error.json());
          alert('Upload failed!');
        }
      );
  }

  fileChange(event: any) {
    for (const file of event.target.files) {
      this.record.filesList.push(file);
      this.record.fileHeaders.push(new FileHeaderModel());
    }
    for (const item of this.record.filesList) {
      console.log(item.name);
    }
  }

  ngOnInit() {
    this.record = new RecordModel();
  }

  ifRecordInitialized() {
    return this.hasRecordInitialized;
  }

  hasRecordName() {
    return this.record.recordHeader.name !== '';
  }

  getPromptText() {
    return this.hasRecordInitialized ? this.promptCitationEdit : this.promptRecordHeader;
  }
}



import {Component, OnInit, Output, EventEmitter } from '@angular/core';
import {RecordModel} from '../../shared/record.model';
import {CitationType} from '../../shared/citation-type';
import {RecordService} from '../../services/record.service';
import {FileHeaderModel} from "../../shared/file-header.model";

@Component({
  selector: 'app-form',
  providers: [ RecordService ],
  templateUrl: './form.component.html',
  styleUrls: [
    './form.component.css'
  ]
})
export class FormComponent implements OnInit {

  record: RecordModel;
  hasRecordInitialized = false;
  
  @Output() uploadFinished = new EventEmitter<{responseBody: JSON}>();

  constructor(private recordService: RecordService) {}

  initNewRecord(event) {
    this.hasRecordInitialized = true;
  }

  newRecord(event) {
    console.log(this.record.toString());
    this.recordService.addRecord(this.record)
      .subscribe(
        (response) => {
          console.log(response);
          this.uploadFinished.emit({responseBody: response.json()});
          alert("Succesfull upload!");
        },
        (error) => {
          console.log(error);
          this.uploadFinished.emit({responseBody: error.json()});
          alert("Upload failed!");
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

  enableSnippetView() {
    return this.hasRecordInitialized;
  }

  ifRecordInitialized() {
    return this.hasRecordInitialized;
  }

  hasRecordName() {
    return this.record.recordHeader.name !== '';
  }
}



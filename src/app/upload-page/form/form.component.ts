import {Component, OnInit} from '@angular/core';
import {RecordModel} from '../../shared/record.model';
import {CitationType} from '../../shared/citation-type';
import {RecordService} from '../../services/record.service';
import {FileHeaderModel} from "../../shared/file-header.model";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [
    './form.component.css'
  ]
})
export class FormComponent implements OnInit {

  record: RecordModel;
  recordService: RecordService;

  newRecord(event) {
    console.log(this.record.toString());
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
    return this.record.recordHeader.name !== '';
  }
}



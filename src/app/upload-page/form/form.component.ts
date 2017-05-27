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
  selected: string;
  citationType = CitationType;
  isAddingFile = false;
  recordService: RecordService;

  onSelectChange(value) {
    this.selected = value;
  }

  newRecord(event) {
    console.log(typeof this.recordService);
  }

  fileChange(event: any) {
    this.isAddingFile = true;
    for (const file of event.target.files) {
      this.record.filesList.push(file);
    }
    for (const item of this.record.filesList) {
        console.log(item.name);
    }
  }

  ngOnInit() {
    this.record = new RecordModel();
    this.record.fileHeaders.push(new FileHeaderModel());
    this.record.fileHeaders.push(new FileHeaderModel());
    this.record.fileHeaders.push(new FileHeaderModel());
  }

  enableSnippetView() {
    return this.record.recordHeader.name !== '';
  }
}



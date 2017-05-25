import {Component, OnInit} from '@angular/core';
import {RecordModel} from '../../entities/record.model';
import {CitationType} from '../../entities/citation-type';
import {RecordService} from '../../services/record.service';
import {FileHeaderModel} from "../../entities/file-header.model";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: [
    './form.component.css'
  ]
})
export class FormComponent implements OnInit {

  record: RecordModel;
  files: File[] = [];
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
    // this.files.push(event.target.files[0]);
    this.record.filesList = [].slice.call(event.target.files);
    // input.value = this.files.map(f => f.name).join(', ');
    for (const item of this.files) {
        console.log(item.name);
    }
  }

  ngOnInit() {
    this.record = new RecordModel();
    this.record.fileHeaders.push(new FileHeaderModel());
    this.record.fileHeaders.push(new FileHeaderModel());
    this.record.fileHeaders.push(new FileHeaderModel());
  }
}



import {Component, Input, OnInit} from '@angular/core';
import {RecordDetailsModel} from '../shared/record-details.model';
import {RecordService} from '../services/record.service';
// import 'rxjs/add/observable/of';
// import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input()
  record: RecordDetailsModel;
  filesList: Array<string>;
  showFilesListOn: boolean = false;
  editRecordOn: boolean = false;
  url: string;

  constructor(private recordService: RecordService) {
  }

  ngOnInit() {
  }

  deleteRecord() {
    this.recordService.deleteRecord(this.record.id).subscribe(res => {
      this.record = null;
      alert(res);
    });
  }

  editRecord(){
    this.editRecordOn = !this.editRecordOn;
  }

  getZip(id: string){
    // this.recordService.getZip(id).subscribe((u: string) => this.url = u);
    window.open(this.recordService.getZip(id));
  }

  showFilesList(){
    this.filesList = this.record.filesNames;
    this.showFilesListOn = !this.showFilesListOn;
  }
}

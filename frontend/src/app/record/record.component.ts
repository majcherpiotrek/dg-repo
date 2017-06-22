import {Component, Input, OnInit, ViewChild} from '@angular/core';
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

  @Input() record: RecordDetailsModel;
  @Input() url: string;

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

  saveChanges(){
    this.recordService.editRecord(this.record.id, this.record);
  }

  getZip(id: string){
    window.open(this.recordService.getZip(id));
  }
}

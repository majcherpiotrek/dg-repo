import {Component, Input, OnInit} from '@angular/core';
import {RecordDetailsModel} from '../shared/record-details.model';
import {RecordService} from '../services/record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input()
  record: RecordDetailsModel;

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

  editRecord(){}

}

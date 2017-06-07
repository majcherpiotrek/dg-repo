import {Component, Input, OnInit} from '@angular/core';
import {RecordDetailsModel} from '../shared/record-details.model';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input()
  content: RecordDetailsModel;

  constructor() {
  }

  ngOnInit() {
  }

}

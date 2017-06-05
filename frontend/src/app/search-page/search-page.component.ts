import {Component, OnInit} from '@angular/core';
import {RecordService} from '../services/record.service';
import {RecordModel} from '../shared/record.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  private showedRecord: RecordModel;

  constructor(private recordService: RecordService) {
  }

  getRecordById(id) {
    return this.recordService.getRecord(id).subscribe((r: RecordModel) => this.showedRecord = r);
  }


  ngOnInit() {
  }

}

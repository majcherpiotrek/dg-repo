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
  @Input() url = 'url';

  addNewAttachmentOn: boolean = false;

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

  deleteFile(fileName: string) {
    this.recordService.deleteFileFromRecord(this.record.id, fileName).subscribe(
      (response) => {
        this.record = <RecordDetailsModel> response.json();
        alert('File ' + fileName + ' deleted!');
      },
      (error) => {
        alert('Couldn\'t delete file ' + fileName + '!');
      }
    );
  }

  saveChanges() {
    this.recordService.editRecord(this.record.id, this.record).subscribe(
      (response) => {
        this.record = <RecordDetailsModel> response.json();
        console.log(this.record.toString());
        alert('Changes saved successfully!');
      },
      (error) => {
          console.log(error);
          alert('Failed to save changes!');
        }
    );
  }

  getZip(id: string){
    window.open(this.recordService.getZip(id));
  }
}

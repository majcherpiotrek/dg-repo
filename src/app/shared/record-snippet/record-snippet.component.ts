import { Component, OnInit, Input } from '@angular/core';
import { RecordModel } from '../record.model';
@Component({
  selector: 'app-record-snippet',
  templateUrl: './record-snippet.component.html',
  styleUrls: ['./record-snippet.component.css']
})
export class RecordSnippetComponent implements OnInit {

  @Input() record: RecordModel = new RecordModel();

  constructor() { }

  ngOnInit() {
  }

  isAuthorSpecified() {
    return this.record.recordHeader.author !== '';
  }

  isCreatorSpecified() {
    return this.record.recordHeader.creator.givenName !== ''
            || this.record.recordHeader.creator.additionalName !== ''
            || this.record.recordHeader.creator.familyName !== '';
  }

  removeFile(file: File){
    const index = this.record.filesList.findIndex(fileToCompare => fileToCompare === file);
    if (index !== -1) {
      this.record.filesList.splice(index, 1);
    }
  }

}

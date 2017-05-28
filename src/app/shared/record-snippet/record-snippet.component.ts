import { Component, OnInit, Input } from '@angular/core';
import { RecordModel } from '../record.model';
@Component({
  selector: 'app-record-snippet',
  templateUrl: './record-snippet.component.html',
  styleUrls: ['./record-snippet.component.css']
})
export class RecordSnippetComponent implements OnInit {

  @Input() record: RecordModel = new RecordModel();
  filesUnderEdit: File[] = [];
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

  removeFile(file: File) {
    const index = this.findFileIndex(file);
    if (index !== -1) {
      this.record.filesList.splice(index, 1);
    }
  }

  enableFileEdit(file: File) {
    const index = this.filesUnderEdit.findIndex(x => x === file);
    if (index === -1) {
      this.filesUnderEdit.push(file);
    } else {
      this.filesUnderEdit.splice(index, 1);
    }
  }

  isEditEnabled(file: File) {
    const index = this.filesUnderEdit.findIndex(x => x === file);
    return index !== -1;
  }

  findFileIndex(file: File) {
    return this.record.filesList.findIndex(fileToCompare => fileToCompare === file);
  }
}

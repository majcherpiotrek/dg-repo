import { Component, OnInit, Input } from '@angular/core';
import { RecordModel } from '../../../shared/record.model';
import { FileHeaderModel } from '../../../shared/file-header.model';

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
      this.record.fileHeaders.splice(index, 1);
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

  onMetadataAdded(metadata: {file: File, header: FileHeaderModel}) {
    const index = this.findFileIndex(metadata.file);
    if (index !== -1) {
      console.log(metadata.header.toString());
      this.record.fileHeaders[index] = metadata.header;
    }
    this.enableFileEdit(metadata.file);
  }

  getFileMetadata(file: File) {
    const index = this.findFileIndex(file);
    if (index !== -1) {
      return this.record.fileHeaders[index];
    }
  }
}

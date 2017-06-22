import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileHeaderModel } from '../../../../shared/file-header.model';
import { CitationType } from '../../../../shared/citation-type';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css']
})
export class FileEditComponent implements OnInit {

  types: string[] = [];
  fileHeader: FileHeaderModel;
  @Input() file: File;
  @Input() metadata: FileHeaderModel;
  // TODO change to input, doesnt make sense to emit an event here
  @Output() metadataAdded = new EventEmitter<{file: File, header: FileHeaderModel}>();

  constructor() {
    this.fileHeader = new FileHeaderModel();
    for(let element in CitationType) {
      if (typeof CitationType[element] === 'number') {
          this.types.push(element);
      }
    }
    console.log(this.types);
 }

  ngOnInit() {
    this.fileHeader = this.metadata;
  }

  onSaveMetadata() {
    this.metadataAdded.emit({file: this.file, header: this.fileHeader});
  }
}

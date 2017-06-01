import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileHeaderModel } from '../../../../shared/file-header.model';
import { CitationType } from '../../../../shared/citation-type';

@Component({
  selector: 'app-file-edit',
  templateUrl: './file-edit.component.html',
  styleUrls: ['./file-edit.component.css']
})
export class FileEditComponent implements OnInit {

  types = CitationType;
  fileHeader: FileHeaderModel;
  @Input() file: File;
  // TODO change to input, doesnt make sense to emit an event here
  @Output() metadataAdded = new EventEmitter<{file: File, header: FileHeaderModel}>();

  constructor() {
    this.fileHeader = new FileHeaderModel();
  }

  ngOnInit() {
  }

  onSelectionChange(value: CitationType) {
    this.fileHeader.type = value.toString();
  }

  onSaveMetadata() {
    this.metadataAdded.emit({file: this.file, header: this.fileHeader});
  }
}

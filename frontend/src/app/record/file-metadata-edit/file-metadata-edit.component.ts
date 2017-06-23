import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileHeaderModel } from '../../shared/file-header.model';
import { CitationType } from '../../shared/citation-type';

@Component({
    selector: 'app-file-metadata-edit',
    templateUrl: './file-metadata-edit.component.html',
    styleUrls: ['./file-metadata-edit.component.css']
})
export class FileMetadataEditComponent implements OnInit {

    types: string[] = [];
    fileHeader: FileHeaderModel;
    @Input() file: File;
    @Input() fileName: string;
    @Input() metadata: FileHeaderModel;
    // TODO change to input, doesnt make sense to emit an event here
    @Output() metadataAdded = new EventEmitter<{ file: File, header: FileHeaderModel }>();

    constructor() {
        this.fileHeader = new FileHeaderModel();
        for (let element in CitationType) {
            if (typeof CitationType[element] === 'number') {
                this.types.push(element);
            }
        }
        console.log(this.types);
    }

    ngOnInit() {
        this.fileHeader = this.metadata;
    }

    updateFileMetadata() {
        
    }

    getFileName(file: File) {
        return file.name;
    }
}

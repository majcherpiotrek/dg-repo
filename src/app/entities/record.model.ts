import {FileHeaderModel} from './file-header.model';

export class RecordModel {
    public recordHeader: FileHeaderModel;
    public fileHeaders: FileHeaderModel[] = [];
    public filesList: File[] = [];
}

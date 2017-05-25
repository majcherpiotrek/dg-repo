import {FileHeaderModel} from './file-header.model';

export class RecordModel {
    public recordHeader: FileHeaderModel;
    public fileHeaders: FileHeaderModel[] = [];
    public filesList: File[] = [];

    public constructor() {
      this.recordHeader = new FileHeaderModel();
    }

  public toString = () : string => {
    return '{ "recordHeader":' + this.recordHeader.toString() + ', ' +
      '"fileHeaders":' + this.fileHeaders.toString() + '}';
  }
}

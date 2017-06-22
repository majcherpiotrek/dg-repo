import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {RecordModel} from '../shared/record.model';
import {RecordDetailsModel} from '../shared/record-details.model';
import {FileHeaderModel} from '../shared/file-header.model';

@Injectable()
export class RecordService {

  private backUrl = 'http://localhost:8080/';
  private getSingleRecordUrl = 'api/records?record-id=';
  private uploadUrl = 'api/upload';
  private downloadZip = 'api/records/zip?record-id=';
  private editRecordUrl = 'api/records/edit';
  private deleteFileUrl = 'api/records/delete-file';
  private addFileUrl = 'api/records/add-file';
  
  constructor(private http: Http) {
  }

  addRecord(record: RecordModel) {
    const formData = new FormData();
    formData.append('recordHeader', record.recordHeader.toString());
    let fileHeadersString = '[';
    for (let i = 0; i < record.filesList.length; i++) {
      formData.append('filesList', record.filesList[i], record.filesList[i].name);
      fileHeadersString += record.fileHeaders[i].toString();
      if (i < record.filesList.length - 1) {
        fileHeadersString += ',';
      }
    }
    fileHeadersString += ']';
    formData.append('fileHeaders', fileHeadersString);
    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    console.log('Sending POST with : ' + record.recordHeader.toString());
    return this.http.post(this.backUrl + this.uploadUrl, formData, options);
  }

  private extractData(res: Response) {
    const body = res.json();
    alert(res.text);
    console.log('Receiving response ...');
    console.log(body.data);
    return body.data || {};
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }

  getRecord(id: string) {
    const url = `${this.backUrl}${this.getSingleRecordUrl}${id}`;
    console.log('GET from ' + url);
    return this.http.get(url)
      .map((res: Response) => <RecordModel>res.json());
  }

  getRecordDetails(id: string) {
    const url = `${this.backUrl}${this.getSingleRecordUrl}${id}`;
    console.log('GET from ' + url);
    return this.http.get(url)
      .map((res: Response) => <RecordDetailsModel>res.json());
  }

  getZip(id: string) {
    const url = `${this.backUrl}${this.downloadZip}${id}`;
    console.log('GET from ' + url);
    return url;
  }

  deleteRecord(id: string) {
    const url = `${this.backUrl}${this.getSingleRecordUrl}${id}`;
    console.log('DELETE from ' + url);
    return this.http.delete(url).map((res: Response) => res);
  }

  editRecord(id: string, newRecordDetails: RecordDetailsModel) {
    const url = `${this.backUrl}${this.editRecordUrl}`;
    console.log('post to: ' + url);
    console.log(JSON.stringify(newRecordDetails));
    const formData = new FormData();
    formData.append('dto', JSON.stringify(newRecordDetails));
    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.http.post(url, formData, options);
  }

  deleteFileFromRecord(id: string, fileName: string) {
    const url = `${this.backUrl}${this.deleteFileUrl}`;
    const formData = new FormData();
    formData.append('id', id);
    formData.append('filename', fileName);
    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    return this.http.post(url, formData, options);
  }

  addFiles(id: string, files: File[], fileHeaders: FileHeaderModel[]){
    const formData = new FormData();
    let fileHeadersString = '[';
    for (let i = 0; i < files.length; i++) {
      formData.append('filesList', files[i], files[i].name);
      fileHeadersString += fileHeaders[i].toString();
      if (i < files.length - 1) {
        fileHeadersString += ',';
      }
    }
    fileHeadersString += ']';
    formData.append('recordId', id);
    formData.append('fileHeaders', fileHeadersString);
    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    console.log('Sending POST with : ' + fileHeadersString);
    return this.http.post(this.backUrl + this.addFileUrl, formData, options);
  }
}

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {RecordModel} from '../shared/record.model';

@Injectable()
export class RecordService {

  private recordUrl = 'http://localhost:8080/api/upload';

  constructor(private http: Http) { }

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
    return this.http.post(this.recordUrl, formData, options);
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
}

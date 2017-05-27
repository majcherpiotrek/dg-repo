import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {RecordModel} from '../shared/record.model';

@Injectable()
export class RecordService {

  private recordUrl = 'https://localhost:8081/api/upload';

  constructor(private http: Http) { }

  addRecord(record: RecordModel) {
    const formData = new FormData();
    if (record.filesList.length > 0 ) {
      for (const item of record.filesList) {
        formData.append('filesList', item, item.name);
      }
    }

    formData.append('name', record.recordHeader.name);
    formData.append('user', record.recordHeader.author);
    formData.append('description', record.recordHeader.about);

    const headers = new Headers();
    const options = new RequestOptions({headers: headers});
    this.http.post(this.recordUrl, formData, options)
      .toPromise()
      .then(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    alert(res.text);
    return body.data || {};
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server Error');
  }
}

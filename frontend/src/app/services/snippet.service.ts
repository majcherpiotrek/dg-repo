import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SnippetService {

  private backUrl = 'http://localhost:8080/';
  private singleRecord = 'api/snippets?searchArg=';
  private byAuthor = 'api/snippets/byAuthor?searchArg=';

  constructor(private http: Http) {
  }

  searchSnippet(query: string) {
    const url = `${this.backUrl}${this.singleRecord}${query}`;
    console.log('GET from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());
  }

  getSnippetsByAuthor(author: string) {
    const url = `${this.backUrl}${this.byAuthor}${author}`;
    console.log('GET from ' + url);
    return this.http.get(url)
      .map((res: Response) => res.json());
  }


}

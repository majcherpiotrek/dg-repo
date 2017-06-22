import {Component, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {Snippet} from '../shared/snippet.model';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {RecordDetailsModel} from '../shared/record-details.model';
import {RecordService} from '../services/record.service';
// import {RecordModel} from '../shared/record.model';
// import {FileHeaderModel} from '../shared/file-header.model';

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.css']
})
export class PresentationPageComponent implements OnInit {

  protected snippets: Observable<Snippet[]>;
  protected record: RecordDetailsModel;
  // protected recordM: RecordModel;
  protected searchTerms = new Subject<string>();
  protected showResultsLabel = false;
  protected showDetails = false;
  // protected zip: File;
  protected filesList: string;

  constructor(protected snippetService: SnippetService, protected recordService: RecordService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.showResultsLabel = true;
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.snippets = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.snippetService.searchSnippet(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Snippet[]>([]))
      .catch(error => {
        // TODO: add real error handling
        this.showResultsLabel = false;
        console.log(error);
        return Observable.of<Snippet[]>([]);
      });
  }

  gotoDetail(snipp: Snippet): void {
    this.recordService.getRecordDetails(snipp.id).subscribe((r: RecordDetailsModel) => this.record = r);
    this.record.filesNames.forEach(element => {
      console.log(element);
    });
    console.log(this.record.creator);
    this.showDetails = !this.showDetails;
  }

  getZip(id: string){
    window.open(this.recordService.getZip(id));
  }

  getZipUrl(id: string) {
    console.log(id);
    return this.recordService.getZip(id);
  }
}

import {Component, OnInit} from '@angular/core';
import {PresentationPageComponent} from '../presentation-page/presentation-page.component';
import {SnippetService} from '../services/snippet.service';
import {RecordService} from '../services/record.service';
import {Observable} from 'rxjs/Observable';
import {Snippet} from '../shared/snippet.model';
import {RecordDetailsModel} from '../shared/record-details.model';

@Component({
  selector: 'app-dashboard-presentation',
  templateUrl: './dashboard-presentation.component.html',
  styleUrls: ['./dashboard-presentation.component.css']
})
export class DashboardPresentationComponent extends PresentationPageComponent implements OnInit {

  constructor(snippetService: SnippetService, recordService: RecordService) {
    super(snippetService, recordService);
  }

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
        ? this.snippetService.getSnippetsByAuthor(term)
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
    // let link = ['/detail', hero.id];
    // this.router.navigate(link);
    this.recordService.getRecordDetails(snipp.id).subscribe((r: RecordDetailsModel) => this.record = r);

    this.showDetails = !this.showDetails;
  }
}

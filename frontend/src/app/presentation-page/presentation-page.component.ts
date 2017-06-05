import {Component, OnInit} from '@angular/core';
import {SnippetService} from '../services/snippet.service';
import {Snippet} from '../shared/snippet.model';
import 'rxjs/add/observable/of';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-presentation-page',
  templateUrl: './presentation-page.component.html',
  styleUrls: ['./presentation-page.component.css']
})
export class PresentationPageComponent implements OnInit {

  snippets: Observable<Snippet[]>;
  private searchTerms = new Subject<string>();

  constructor(private snippetService: SnippetService) {
  }

  // Push a search term into the observable stream.
  search(term: string): void {
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
        console.log(error);
        return Observable.of<Snippet[]>([]);
      });
  }

  gotoDetail(snipp: Snippet): void {
    // let link = ['/detail', hero.id];
    // this.router.navigate(link);
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FileHeaderModel } from '../shared/file-header.model';
@Component({
  selector: 'app-file-snippet',
  templateUrl: './file-snippet.component.html',
  styleUrls: ['./file-snippet.component.css']
})
export class FileSnippetComponent implements OnInit {
  @Input() fileName: string;
  header: FileHeaderModel = new FileHeaderModel();
  constructor() { }

  ngOnInit() {
  }

}

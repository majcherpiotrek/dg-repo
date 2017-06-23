import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {UploadPageComponent} from './upload-page/upload-page.component';
import {SearchPageComponent} from './search-page/search-page.component';
import {PresentationPageComponent} from './presentation-page/presentation-page.component';
import {FormComponent} from './upload-page/form/form.component';
import {CollapseDirective} from '../../node_modules/ng2-bootstrap/collapse';
import {FileSnippetComponent} from './file-snippet/file-snippet.component';
import {RecordSnippetComponent} from './upload-page/form/record-snippet/record-snippet.component';
import {FileEditComponent} from './upload-page/form/record-snippet/file-edit/file-edit.component';
import {RecordService} from './services/record.service';
import {AppRoutingModule} from './app-routing.module';
import {SnippetService} from './services/snippet.service';
import { DashboardPresentationComponent } from './dashboard-presentation/dashboard-presentation.component';
import { RecordComponent } from './record/record.component';
import { FileMetadataEditComponent } from './record/file-metadata-edit/file-metadata-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadPageComponent,
    SearchPageComponent,
    PresentationPageComponent,
    FormComponent,
    CollapseDirective,
    FileSnippetComponent,
    RecordSnippetComponent,
    FileEditComponent,
    DashboardPresentationComponent,
    RecordComponent,
    FileMetadataEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [RecordService, SnippetService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

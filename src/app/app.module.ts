import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UploadPageComponent } from './upload-page/upload-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PresentationPageComponent } from './presentation-page/presentation-page.component';
import { FormComponent } from './upload-page/form/form.component';
import { CollapseDirective } from '../../node_modules/ng2-bootstrap/collapse';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UploadPageComponent,
    SearchPageComponent,
    PresentationPageComponent,
    FormComponent,
    CollapseDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SearchPageComponent} from './search-page/search-page.component';
import {UploadPageComponent} from './upload-page/upload-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/upload', pathMatch: 'full'},
  {path: 'upload', component: UploadPageComponent},
  {path: 'search', component: SearchPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

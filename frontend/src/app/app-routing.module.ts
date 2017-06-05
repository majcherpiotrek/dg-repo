import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadPageComponent} from './upload-page/upload-page.component';
import {PresentationPageComponent} from './presentation-page/presentation-page.component';


const routes: Routes = [
  {path: '', redirectTo: '/upload', pathMatch: 'full'},
  {path: 'upload', component: UploadPageComponent},
  {path: 'search', component: PresentationPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadPageComponent} from './upload-page/upload-page.component';
import {PresentationPageComponent} from './presentation-page/presentation-page.component';
import {DashboardPresentationComponent} from './dashboard-presentation/dashboard-presentation.component';


const routes: Routes = [
  {path: '', redirectTo: '/upload', pathMatch: 'full'},
  {path: 'upload', component: UploadPageComponent},
  {path: 'search', component: PresentationPageComponent},
  {path: 'dashboard', component: DashboardPresentationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

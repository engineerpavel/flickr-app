import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImageSearchComponent} from './components/image-search/image-search.component';

const routes: Routes = [
  {
    path: '', component: ImageSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

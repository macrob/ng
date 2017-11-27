import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpTestComponent } from './http-test/http-test.component';


const routes: Routes = [
  { path: 'htto-test', component: HttpTestComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

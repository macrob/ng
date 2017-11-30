import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpTestComponent } from './http-test/http-test.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  { path: 'htto-test', component: HttpTestComponent },
  { path: 'contacts', component: ContactsComponent },
{ path: 'landing', component: LandingComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HttpTestComponent } from './http-test/http-test.component';
import { ContactsComponent } from './contacts/contacts.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
      path: '',
      component: MainComponent,
      children: [
        {
            component: DashboardComponent,
            path: '',
        },
        { path: 'htto-test', component: HttpTestComponent },
        { path: 'contacts', component: ContactsComponent },
        { path: 'landing', component: LandingComponent }
]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

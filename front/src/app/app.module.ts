import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { HttpTestComponent } from './http-test/http-test.component';


import { MessageService } from './message.service';
import { TestService } from './test.service';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HttpTestComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule
  ],

  bootstrap: [AppComponent],
  providers: [TestService, MessageService],
})
export class AppModule { }

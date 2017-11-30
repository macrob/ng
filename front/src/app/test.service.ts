import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import config from './config';
export type Test = any;

@Injectable()
export class TestService {

  private apiUrl = `${config.api}`;  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  post(path: string, opt?: {}): Observable<any> {
    return this.http.post<Test[]>(this.apiUrl + path, opt).pipe(
      map(result => {
        console.log(result);
        return (<any>result);
      }),
      tap(heroes => (this.log(`fetched http test service`))),
      catchError(this.handleError('testService', []))
    );
  }

  get(path: string, opt?: {}): Observable<any> {
    return this.http.get<Test[]>(this.apiUrl + path).pipe(
      map(result => {
        console.log(result);
        return (<any>result);
      }),
      tap(heroes => (this.log(`fetched http test service`))),
      catchError(this.handleError('testService', []))
    );
  }

  /** GET heroes from the server */
  getList(): Observable<Test[]> {
    return this.http.get<Test[]>(this.apiUrl)
      .pipe(
      map(result => {

        return (<any>result).data;
      }),
      tap(heroes => (this.log(`fetched http test service`))),
      catchError(this.handleError('testService', []))
      );
  }

  private log(message: string) {
    console.log(message);
    this.messageService.add('testService: ' + message);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

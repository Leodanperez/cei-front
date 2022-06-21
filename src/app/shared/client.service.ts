import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Client } from './client.interface';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private endpoint: string = 'http://localhost:8081/api/';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  getClients(): Observable<any> {
    return this.http.get(`${this.endpoint}clients`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  createClient(client: Client): Observable<any> {
    return this.http.post(`${this.endpoint}clients`, client, { headers: this.headers })
    .pipe(
      catchError(this.handleError)
    )
  }

  handleError(err: HttpErrorResponse) {
    let msg = '';
    if (err.error instanceof ErrorEvent) {
      msg = err.error.message;
    } else {
      msg = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(() => {msg});
  }
}

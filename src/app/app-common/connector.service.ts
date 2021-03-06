import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, retry, tap, timeout } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ConnectorService {
  static httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };
  public static retryTimes = 0;
  public static timeOut = 3 * 1000;

  public static host = 'http://localhost:8080';

  constructor(
    public httpClient: HttpClient,
  ) { }

  // public post(
  //   service: string,
  //   data: any,
  //   onError: any,
  //   errorLabel?: string
  // ): Observable<any> {
  //   return this.httpClient
  //     .post<any>(
  //       ConnectorService.host + service,
  //       data,
  //       ConnectorService.httpOptions
  //     )
  //     .pipe(
  //       timeout(ConnectorService.timeOut),
  //       retry(ConnectorService.retryTimes),
  //       tap(
  //         // res => console.log(res),
  //         // error => console.log(error)
  //       )
  //     );
  // }

  public post(
    service: string,
    data: any,
    onError: any,
    errorLabel?: string,
    params?:any
  ): Observable<any> {
    return this.httpClient
      .post<any>(
        ConnectorService.host + service,
        data,
        { headers: ConnectorService.httpOptions.headers,
          params: params,
          withCredentials: ConnectorService.httpOptions.withCredentials
        }
      )
      .pipe(
        timeout(ConnectorService.timeOut),
        retry(ConnectorService.retryTimes),
        tap(
          // res => console.log(res),
          // error => console.log(error)
        )
      );
  }

  public get(service: string,onError?: any,errorLabel?: string, params?:any): Observable<any> {
    return this.httpClient.get(ConnectorService.host+service,
      { headers: ConnectorService.httpOptions.headers,
        params: params,
        withCredentials: ConnectorService.httpOptions.withCredentials
      })
      .pipe(
        timeout(ConnectorService.timeOut),
        retry(ConnectorService.retryTimes),
        tap(
          // res => console.log(res),
          // error => console.log(error)
        )
      );
  }

  public getImage(service: string,onError?: any,errorLabel?: string, params?:any): Observable<any> {
    return this.httpClient.get(ConnectorService.host+service,
      { headers:  new HttpHeaders({ 'Content-Type': 'image/jpeg' }),
        params: params,
        withCredentials: ConnectorService.httpOptions.withCredentials,
        responseType: 'blob'
      })
      .pipe(
        timeout(ConnectorService.timeOut),
        retry(ConnectorService.retryTimes),
        tap(
          // res => console.log(res),
          // error => console.log(error)
        )
      );
  }

  public patch(service: string,   data: any, onError?: any,errorLabel?: string, params?:any): Observable<any> {
    return this.httpClient.patch(ConnectorService.host+service, data,
      { headers: ConnectorService.httpOptions.headers,
        params: params,
        withCredentials: ConnectorService.httpOptions.withCredentials
      })
      .pipe(
        timeout(ConnectorService.timeOut),
        retry(ConnectorService.retryTimes),
        tap(
          // res => console.log(res),
          // error => console.log(error)
        )
      );
  }


}

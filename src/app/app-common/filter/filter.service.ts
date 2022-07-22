import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFieldResult } from 'ngx-mat-search-field';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { Cast } from 'src/app/models/user.model';
import { ConnectorService } from '../connector.service';
import { UtilsService } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterAPI = '/api/cast/params/';
  public selectedKey:any="firstname";

  casts = new BehaviorSubject<Array<Cast>>([]);

  constructor(private http: HttpClient,
              private api:ConnectorService) {}


  getSearchParameters(searchValue: string, size: number, skip: number): Observable<SearchFieldResult>{
    const page = Math.round(skip / size);

    let queryParams = new HttpParams();

    if(this.selectedKey!=undefined && this.selectedKey!="" && searchValue!=undefined && searchValue!="" ){
        if(this.selectedKey=="birthday")
            searchValue=UtilsService.calculateBirthDateRangeFromAge(searchValue);
        queryParams= queryParams.append(this.selectedKey, searchValue);
    }
    if(page!=undefined && size!=undefined){
      queryParams = queryParams.append("page",page);
      queryParams= queryParams.append("size",size);
    }
    return this.api.get(this.filterAPI,null,"", queryParams)
      .pipe(
        map((data: any) => {
          let count = 1;
          this.casts.next(data.results);
          if (page === 1 && data.info && data.info.pages) {
            count = Number(data.info.count);
          }
          return {
            info: {
              count: count
            },
            items: []
          };
        }),
        catchError((err: any) => {
          return of({
            info: {
              count: 0
            },
            items: []
          });
        })
      );
  }

  getCastsBySearchParameters(searchKey?: string, searchValue?: string, size?: number, page?:number): Observable<any>{
    let queryParams = new HttpParams();
    if(searchKey!=undefined && searchKey!="" && searchValue!=undefined && searchValue!="" ){
        queryParams= queryParams.append(searchKey, searchValue);
    }
    if(page!=undefined && size!=undefined){
      queryParams = queryParams.append("page",page);
      queryParams= queryParams.append("size",size);
    }
    return this.api.get(this.filterAPI,null,"", queryParams)
    // let searchParams="";
    // if(searchKey!="" && searchValue!="")
    //     searchParams=`${searchKey}=${searchValue}`;
    // return this.http
    //   .get(this.filterAPI+`?${searchParams}&page=${page}&size=${size}`);
  }

}

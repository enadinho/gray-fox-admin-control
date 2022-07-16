import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchFieldResult } from 'ngx-mat-search-field';
import { catchError, map, Observable, of } from 'rxjs';
import { ConnectorService } from '../connector.service';
import { UtilsService } from '../utils';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  filterAPI = '/api/cast/params/';

  constructor(private http: HttpClient,
              private api:ConnectorService) {}

  getCharacters(search: string, size: number, skip: number): Observable<SearchFieldResult> {
    const page = Math.round(skip / size) + 1;
    return this.http
      .get(`https://rickandmortyapi.com/api/character/?name=${search.toLowerCase()}&page=${page}`)
      .pipe(
        map((data: any) => {
          let count = 1;
          if (page === 1 && data.info && data.info.pages) {
            count = Number(data.info.count);
          }
          return {
            info: {
              count: count
            },
            items: data.results.map((item: any) => {
              return {
                title: item.species ? `${item.name}|${item.species}` : item.name,
                value: item.id
              };
            })
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

  getSearchedParameters(searchKey: string, search: string, size: number, skip: number): Observable<SearchFieldResult>{
    const page = Math.round(skip / size) + 1;
    return this.http
      .get(this.filterAPI+`?${searchKey}=${search.toLowerCase()}&page=${page}&size=${size}`)
      .pipe(
        map((data: any) => {
          let count = 1;
          if (page === 1 && data.info && data.info.pages) {
            count = Number(data.info.count);
          }
          return {
            info: {
              count: count
            },
            items: data.results.map((item: any) => {
              return {
                title: item.species ? `${item.name}|${item.species}` : item.name,
                value: item.id
              };
            })
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


}

import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConnectorService } from 'src/app/app-common/connector.service';

@Injectable({
  providedIn: 'root'
})
export class CastService {
  castAPI = '/api/cast';


  constructor(public api: ConnectorService,
              private router:Router) {
  }

  getAll(page:number, size:number):Observable<any>{
    return this.api.get(this.castAPI+"/allCasts", null, "", this.getPagingQueryParams(page,size));
  }

  getAllPending(page:number, size:number):Observable<any>{
    return this.api.get(this.castAPI+"/allCasts/pending", null, "", this.getPagingQueryParams(page,size));
  }

  getAllAccepted(page:number, size:number):Observable<any>{
    return this.api.get(this.castAPI+"/allCasts/accepted", null, "", this.getPagingQueryParams(page,size));
  }

  getPagingQueryParams(page:number, size:number){
    let queryParams = new HttpParams();
    queryParams = queryParams.append("page",page);
    queryParams= queryParams.append("size",size);
    return queryParams;
  }
}

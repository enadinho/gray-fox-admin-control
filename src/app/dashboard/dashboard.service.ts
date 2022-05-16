import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectorService } from '../app-common/connector.service';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  public static testAPI = '/api/cast/inActiveCast';

  constructor(public api: ConnectorService) { }

  public getAllInActiveCast(onError?: any,errorLabel?: string): Observable<any> {
    return this.api.get(
      DashboardService.testAPI,
      onError,
      errorLabel
    );
  }
}

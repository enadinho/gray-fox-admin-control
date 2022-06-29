import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectorService } from 'src/app/app-common/connector.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  public static testAPI = '/api/employee/allEmployees'

  constructor(public api: ConnectorService) { }

  public getAllEmployees(onError?: any,errorLabel?: string): Observable<any> {
    return this.api.get(
      EmployeeService.testAPI,
      onError,
      errorLabel
    );
  }
}

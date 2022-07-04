import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employeesList: any = []
  //employeeProfile: profiles = []

  constructor(
    private http: HttpClient,
    public employeesWorker: EmployeeService
    //this.employeeProfile.push(new profiles());
    ) { }

  ngOnInit(): void {
    this.employeesWorker.getAllEmployees().subscribe(
      (result:any)=> {
        this.employeesList = result
      }
    );
    console.log(this.employeesList)
  } 

  /*add() {
    this.employeeProfile.push(new profiles())
  }*/

}

/*export class profiles{
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  active: string | undefined;
}*/

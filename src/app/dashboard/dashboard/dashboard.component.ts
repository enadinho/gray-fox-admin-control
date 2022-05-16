import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  inActiveCasts = [];

  constructor(private dashBoardService: DashboardService) { }

  ngOnInit(): void {
    this.dashBoardService.getAllInActiveCast().subscribe(res =>{
      this.inActiveCasts = res;
      console.log(this.inActiveCasts);
    });
  }

}

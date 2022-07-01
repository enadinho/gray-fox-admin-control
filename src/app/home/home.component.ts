import { Component, OnInit } from '@angular/core';
import { Cast } from '../models/user.model';
import { CastService } from '../services/cast/cast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allCasts:Cast[] = [];
  currentPage=0;
  pageSize=3;
  totalItems=0;

  config: any;



  constructor(private castService:CastService) {
    this.config = {
      itemsPerPage: this.pageSize,
      currentPage: 1,
      totalItems: this.allCasts.length
    };
   }

  ngOnInit(): void {
    this.castService.getAll().subscribe(res =>{
      this.allCasts = res;
      console.log(this.allCasts);
    });
  }


  pageChanged(event:any){
    this.config.currentPage = event;
    this.castService.getAllPending(event-1, this.pageSize).subscribe(res =>{
      this.allCasts = res.casts;
      this.config.totalItems = res.totalItems;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Cast } from '../models/user.model';
import { CastService } from '../services/cast/cast.service';
import { InActiveCastService } from './inActiveCast.service';

@Component({
  selector: 'app-in-active-cast',
  templateUrl: './in-active-cast.component.html',
  styleUrls: ['./in-active-cast.component.css']
})
export class InActiveCastComponent implements OnInit {

  pendingCasts:Cast[] = [];
  currentPage=0;
  pageSize=4;
  totalItems=0;

  config: any;



  constructor(private castService:CastService) {
    this.config = {
      itemsPerPage: this.pageSize,
      currentPage: 1,
      totalItems: this.pendingCasts.length
    };
   }

  ngOnInit(): void {
    this.castService.getAllPending(this.currentPage, this.pageSize).subscribe(res =>{
      this.pendingCasts = res.casts;
      this.config.totalItems = res.totalItems;
      console.log(this.pendingCasts);
    });
  }


  pageChanged(event:any){
    this.config.currentPage = event;
    this.castService.getAllPending(event-1, this.pageSize).subscribe(res =>{
      this.pendingCasts = res.casts;
      this.config.totalItems = res.totalItems;
      console.log(this.pendingCasts);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Cast } from 'src/app/models/user.model';
import { CastService } from 'src/app/services/cast/cast.service';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {

  acceptedCasts:Cast[] = [];
  currentPage=0;
  pageSize=4;
  totalItems=0;

  config: any;



  constructor(private castService:CastService) {
    this.config = {
      itemsPerPage: this.pageSize,
      currentPage: 1,
      totalItems: this.acceptedCasts.length
    };
   }

  ngOnInit(): void {
    this.castService.getAllAccepted(this.currentPage, this.pageSize).subscribe(res =>{
      this.acceptedCasts = res.casts;
      this.config.totalItems = res.totalItems;
    });
  }


  pageChanged(event:any){
    this.config.currentPage = event;
    this.castService.getAllAccepted(event-1, this.pageSize).subscribe(res =>{
      this.acceptedCasts = res.casts;
      this.config.totalItems = res.totalItems;
    });
  }


}

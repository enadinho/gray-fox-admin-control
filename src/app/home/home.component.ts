import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Cast } from '../models/user.model';
import { CastService } from '../services/cast/cast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allCasts:Cast[] = [];
  filters:any[]=[];
  searchKeys=["Name", "Age", "Height", "Weight", "Body Type", "Country"]
  searchValues:string[]=[];
  currentPage=0;
  pageSize=3;
  totalItems=0;

  config: any;

  @ViewChild('myPopover') myPopover:any;



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
      this.loadSearchValues();
      this.loadFilters();
    });
  }


  pageChanged(event:any){
    this.config.currentPage = event;
    this.castService.getAllPending(event-1, this.pageSize).subscribe(res =>{
      this.allCasts = res.casts;
      this.config.totalItems = res.totalItems;
    });
  }

  loadSearchValues(event?:any){
    this.searchValues=[];
    if(event==null || event.searchKey=="Name"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.firstname+" "+cast.lastname)
      })
    }
    else if(event.searchKey=="Age"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.birthday)
      })
    }
    else if(event.searchKey=="Height"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.height)
      })
    }
    else if(event.searchKey=="Weight"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.weight)
      })
    }
    else if(event.searchKey=="Body Type"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.bodytype)
      })
    }
    else if(event.searchKey=="Country"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.national)
      })
    }
  }

  loadFilters(){
    this.filters.push({
      key: "Name",
      value: "Ramsath"
    });

    this.filters.push({
      key: "Age",
      value: "32"
    })
  }

  removeFilter(index:any){
    this.filters.splice(index, 1);
    this.myPopover.hide();
  }

  addFilter(event:any){
    this.filters.push(event)
    this.myPopover.hide()
  }

}

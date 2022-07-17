import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Cast } from 'src/app/models/user.model';
import { UtilsService } from '../utils';

@Component({
  selector: 'app-filter-nav-bar',
  templateUrl: './filter-nav-bar.component.html',
  styleUrls: ['./filter-nav-bar.component.css']
})
export class FilterNavBarComponent implements OnInit {

  @Input('data') allCasts:Cast[];
  @Output('filterApplied') filterApplied = new EventEmitter();

  filters:any[]=[];
  searchKeys=["First Name","Last Name" ,"Age", "Height", "Weight", "Body Type", "Country", "Status"]
  searchValues:string[]=[];

  @ViewChild('myPopover') myPopover:any;

  constructor() { }

  ngOnInit(): void {
    this.loadSearchValues();
    this.loadFilters();
  }


  loadSearchValues(event?:any){
    this.searchValues=[];
    if(event==null || event.searchKey=="First Name"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.firstname)
      })
    }
    if(event==null || event.searchKey=="Last Name"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.lastname)
      })
    }
    else if(event.searchKey=="Age"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(UtilsService.calculateAgeFromBirthDate(cast.birthday))
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
    this.filterApplied.emit(this.filters);
  }

  addFilter(event:any){
    this.filters.push(event)
    this.myPopover.hide()
    this.filterApplied.emit(this.filters);
  }

}

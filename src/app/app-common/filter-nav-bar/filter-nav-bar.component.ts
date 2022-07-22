import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Cast } from 'src/app/models/user.model';
import { FilterService } from '../filter/filter.service';
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
  searchKeys:string[]=["First Name","Last Name" ,"Age", "Height", "Weight", "Body Type", "Country", "Status"];
  searchValues:string[]=[];
  @ViewChild('myPopover') myPopover:any;

  selectedKey:string;

  constructor( private filterService:FilterService) { }

  ngOnInit(): void {
    this.loadFilters();
    this.loadSearchValues();
    this.filterService.casts.subscribe((data:any) => {
      this.allCasts=data;
      this.loadSearchValues(this.selectedKey);
    })
  }



  loadFilters(){
  //   this.filters.push({
  //     key: "Name",
  //     value: "Ramsath"
  //   });

  //   this.filters.push({
  //     key: "Age",
  //     value: "32"
  //   })
  //load from backend?
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

  searchKeySelected(selectedKey:string){
      this.selectedKey=selectedKey;
      this.loadSearchValues(selectedKey);
      let mappedKey:any=this.getMappedSearcKeyFromSearchName(selectedKey);
      this.filterService.selectedKey=mappedKey;
  }

  loadSearchValues(searchKey?:string, searchValue?:string){

    this.searchValues=[];

    if(!searchKey || searchKey=="First Name"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.firstname)
      })
    }
    else if(searchKey=="Last Name"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.lastname)
      })
    }
    else if(searchKey=="Age"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(UtilsService.calculateAgeFromBirthDate(cast.birthday))
      })
    }
    else if(searchKey=="Height"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.height)
      })
    }
    else if(searchKey=="Weight"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.weight)
      })
    }
    else if(searchKey=="Body Type"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.bodytype)
      })
    }
    else if(searchKey=="Country"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.national)
      })
    }
    else if(searchKey=="Status"){
      this.allCasts.forEach(cast=> {
        this.searchValues.push(cast.status)
      })
    }
    this.searchValues=this.removeDuplicates(this.searchValues);
  }

  removeDuplicates(array:any[]): any[]{
      return [...new Set(array)]
  }

  getMappedSearcKeyFromSearchName(searchKey?:string) {
    if(searchKey==undefined) return;
    if(searchKey=="Age") return "birthday";
    if(searchKey=="Country") return "national";
    return searchKey.toLowerCase().replace(" ", "")
  }

}

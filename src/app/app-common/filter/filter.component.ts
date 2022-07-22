import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchFieldDataSource, SearchFieldResult } from 'ngx-mat-search-field';
import { map, Observable, of, startWith } from 'rxjs';
import { Cast } from 'src/app/models/user.model';
import { UtilsService } from '../utils';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input('searchkeys') searchKeys:string[];
  @Input('searchValues')searchValues:string[];

  @Output("searchKeyClick") searchKeyClick = new EventEmitter();
  @Output("applyFilter") applyFilter = new EventEmitter();

  selectedKey:string;
  selectedValue: string;
  searchFieldDataSource: SearchFieldDataSource;

  constructor(private  filterService:FilterService) {
    this.searchFieldDataSource = {
      search(search: string, size: number, skip: number): Observable<SearchFieldResult> {
        return filterService.getSearchParameters(search,size, skip);
      }
    };
  }

  ngOnInit() {
  }

  searchKeySelected(key:string){
    this.selectedKey=key;
    this.searchKeyClick.emit(key);
  }

  searchValueSelected(value:string){
    this.selectedValue=value;
  }

  applyButtonClick(){
    this.applyFilter.emit({
      key: this.selectedKey,
      value: this.selectedValue
    })
  }



}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchFieldDataSource, SearchFieldResult } from 'ngx-mat-search-field';
import { map, Observable, of, startWith } from 'rxjs';
import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input("searchKeys") searchKeys:string[];
  @Input("searchValues") searchValues:string[];
  @Output("searchKeyClick") searchKeyClick = new EventEmitter();

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  searchFieldDataSource: SearchFieldDataSource;

  constructor(private  filterService:FilterService) {
    this.searchFieldDataSource = {
      search(search: string, size: number, skip: number): Observable<SearchFieldResult> {
        return filterService.getCharacters(search,size, skip);
      }
    };
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  loadSearchValues(key:string){
    console.log(key);
    this.searchKeyClick.emit({searchKey: key});
  }


}

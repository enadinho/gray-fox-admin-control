import { Component, OnInit } from '@angular/core';
import { InActiveCastService } from './inActiveCast.service';

@Component({
  selector: 'app-in-active-cast',
  templateUrl: './in-active-cast.component.html',
  styleUrls: ['./in-active-cast.component.css']
})
export class InActiveCastComponent implements OnInit {
  inActiveCasts = [{name: 'enad'},{name: 'hilal'}];

  constructor(private inActiveCastService: InActiveCastService) { }

  ngOnInit(): void {
    // this.inActiveCastService.getAllInActiveCast().subscribe(res =>{
    //   this.inActiveCasts = res;
    //   console.log(this.inActiveCasts);
    // });
  }

}

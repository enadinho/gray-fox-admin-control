import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/models/user.model';

@Component({
  selector: 'app-request-cast-card',
  templateUrl: './request-cast-card.component.html',
  styleUrls: ['./request-cast-card.component.css']
})
export class RequestCastCardComponent implements OnInit {

  @Input("cast") cast:Cast;

  constructor() { }

  ngOnInit(): void {
  }

}

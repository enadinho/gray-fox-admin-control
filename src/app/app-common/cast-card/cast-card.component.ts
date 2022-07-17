import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/models/user.model';
import { CastService } from 'src/app/services/cast/cast.service';
import { UtilsService } from '../utils';

@Component({
  selector: 'app-cast-card',
  templateUrl: './cast-card.component.html',
  styleUrls: ['./cast-card.component.css']
})
export class CastCardComponent implements OnInit {

  @Input("cast") cast:Cast;

  constructor( private castService:CastService) { }

  ngOnInit(): void {

    this.castService.getCastProfile(this.cast.id).subscribe(res=> {
      if(res){
        var reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = () => {
          const image = document.getElementById('profileImage'+this.cast.id) as HTMLImageElement
          image.src = reader.result as string;
        }
      }
    },
    err=> {
      const image = document.getElementById('profileImage'+this.cast.id) as HTMLImageElement
      image.src = "assets/img/empty.png";
    });

  }

  calculateAgeFromBD(birthdate:string){
   return UtilsService.calculateAgeFromBirthDate(birthdate);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/models/user.model';
import { CastService } from 'src/app/services/cast/cast.service';

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
      console.log(res)
      if(res){
        console.log(typeof(res))
        var reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onload = () => {
          const image = document.getElementById('profileImage'+this.cast.id) as HTMLImageElement
          image.src = reader.result as string;
        }
      }
    })

  }

  calculateAgeFromBD(birthdate:string){
    if (birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    else
      return "NA"
  }

}

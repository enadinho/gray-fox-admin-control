import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from 'src/app/app-common/notification.service';
import { Cast } from 'src/app/models/user.model';
import { CastService } from 'src/app/services/cast/cast.service';


@Component({
  selector: 'app-request-cast-card',
  templateUrl: './request-cast-card.component.html',
  styleUrls: ['./request-cast-card.component.css']
})
export class RequestCastCardComponent implements OnInit {

  @Input("cast") cast:Cast;
  @Output("castUpdated") castUpdated= new EventEmitter<any>();

  constructor( private castService:CastService,
              private notificationService:NotificationService) { }

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
    if (birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
    }
    else
      return "NA"
  }

  accepButtonClick(cardId:number){
    this.castService.updateCastStatus(cardId, {"status": "accepted"}).subscribe(res => {
      if(res==1){
        this.notificationService.showSuccess("Accepted", "Update Success")
        this.castUpdated.emit();
      }
      else if(res==0){
        this.notificationService.showError("", "Accept Failed")
      }
    });
  }

  rejectButtonClick(cardId:number){
    this.castService.updateCastStatus(cardId, {"status": "rejected"}).subscribe(res => {
      if(res==1){
        this.notificationService.showSuccess("Rejected", "Update Success")
        this.castUpdated.emit();
      }
      else if(res==0){
        this.notificationService.showError("", "Reject Failed")
      }
    });
  }

}

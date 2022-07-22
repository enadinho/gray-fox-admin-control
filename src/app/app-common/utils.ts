import { HttpParams } from "@angular/common/http";

export class UtilsService {

  public static getPagingQueryParams(page:any, size:any){
    if(page!=undefined && size!=undefined){
      let queryParams = new HttpParams();
      queryParams = queryParams.append("page",page);
      queryParams= queryParams.append("size",size);
      return queryParams;
    }
    else return null;
  }

  public static calculateAgeFromBirthDate(birthdate:string){
    if (birthdate) {
      var timeDiff = Math.abs(Date.now() - new Date(birthdate).getTime());
      return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25).toString();
    }
    else
      return "NA"
  }

  public static calculateBirthDateRangeFromAge(age:string){
      let today= new Date();
      let birthYear=today.getFullYear()-Number(age);
      console.log(birthYear)
      return birthYear.toString();
  }

}

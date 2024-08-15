import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Subscription} from 'rxjs';
import { MtdService } from './mtd.service';
  
@Injectable({
  providedIn: 'root'
}) 
export class PlaceService {
  sub: Subscription;
  public place = [];labelAttribute ='description';
  constructor( public mtdSv: MtdService,) {
    this.loadPlace();
   }
  
  loadPlace(){ 
    this.sub = this.mtdSv
    .getplace()
    .subscribe((dataplace) => {
      if (dataplace !== null) {
        dataplace.forEach((value, index) => {
            this.place.push({
              id: index,
              description:   value.district + ' '+ value.amphoe + ' ' + value.province + ' ' + value.zipcode ,
              zipcode: value.zipcode,
              amphoe: value.amphoe,
              district: value.district,
              province: value.province
            })
          })
      }
    });
  }

  protected getResults(keyword) {
    keyword = keyword.toLowerCase();
    return this.place.filter(
      (object) => {
        const value = object[this.labelAttribute].toLowerCase();
        return value.includes(keyword);
      }
    );
  }
  
}

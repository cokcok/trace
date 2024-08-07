import { Injectable } from '@angular/core';
import { place } from '../models/place';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class MtdService {
  getpage = ['mtd_product.php']//0 indexล่าสุด
  constructor(private http: HttpClient, private configSv: ConfigService) { 
   
  }
  

  getplace(): Observable<place[]> {
    let apiUrl = "./assets/data/place.json";
    return this.http.get<place[]>(apiUrl);
  }


  
  getmtd(page:number,padding: number, limit: number = 9999999999,condition?): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + this.getpage[page];
     let data = {
      'padding': padding,
      'limit': limit,
      'condition':condition,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }
}

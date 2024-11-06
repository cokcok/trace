import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
import { ConfigService } from './config.service';
import { place } from '../models/place';


@Injectable({
  providedIn: 'root'
})
export class MtdService {
  getpage = ['mtd_product.php','mtd_user.php']//1 indexล่าสุด
  constructor(private http: HttpClient, private configSv: ConfigService) { 
   
  }
  

  getplace(): Observable<place[]> {
    let apiUrl = "./assets/data/place.json";
    return this.http.get<place[]>(apiUrl);
  }
 

  
  getmtd(page:number,data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + this.getpage[page];
    
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  getpro_amp_tam(vdata:any): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    let apiUrl = this.configSv.ip + 'getpro_amp_tam.php';    
    return this.http.post<data>(apiUrl, vdata, { headers: header });
  }


  crudmtd_user(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'mtd_user.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  crudmtd_year(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysyear.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }


}

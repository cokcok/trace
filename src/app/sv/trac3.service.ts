import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
 
@Injectable({
  providedIn: 'root'
})
export class Trac3Service {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  
  gettrac3_read(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1_read.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  crudtrac3(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac3.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  gettrac_quota(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac3.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

}

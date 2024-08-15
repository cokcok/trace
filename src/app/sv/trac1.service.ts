import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class Trac1Service {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  
  crudtrac1(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  crudtrac1_risk(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1_risk.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  gettrac1_read(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1_read.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  gettrac1_read_assessment(type, assessment_id): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1_risk.php';
    const data = {
      type_sql: type,
      id: assessment_id,
    };
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudtrac1_selectland(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1_addreloadselect.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }


  trac1_reloadData(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1_addreloadselect.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


}
 
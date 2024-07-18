import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class Trac1Service {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  
  crudtrac1(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'trac1.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }
}
 
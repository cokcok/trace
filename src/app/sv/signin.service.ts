import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable, Subject } from 'rxjs';
import { employee } from '../models/signin_model';
import { data } from '../models/data_model';
import { HttpClient } from '@angular/common/http';
import { FeedBack } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class SigninService {
  private fooSubject = new Subject<any>();private fooSubject1 = new Subject<any>(); 
  constructor(private http: HttpClient, private configSv: ConfigService) { }


  signin(data): Observable<employee> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'signin.php';
   // let data;
   
    return this.http.post<employee>(apiUrl, data, { headers: header });
  }


  publishSomeData(data: any) {
    this.fooSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.fooSubject;
  }

  publishSomeData1(data: any) {
    this.fooSubject1.next(data);
  }

  getObservable1(): Subject<any> {
    return this.fooSubject1;
  }


  crudchpass(data: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'chpass.php';    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }

}
 
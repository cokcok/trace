import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
@Injectable({
  providedIn: 'root'
})
export class SysmenuService {

  constructor(private http: HttpClient, private configSv: ConfigService) { }


  crudsysmenu(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysmenu.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  getsysmenu(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysmenu.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  crudsyssubmenu(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syssubmenu.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  getsyssubmenu(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syssubmenu.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }


  crudsysgroup(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroup.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  getsysgroup(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroup.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudsyssubmenu_sysgroupmenu(vdata: any, type?: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroupmenu.php';   
    //let data;  
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

  getsyssubmenu_sysgroupmenu(data): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'sysgroupmenu.php';
   
    return this.http.post<data>(apiUrl, data, { headers: header });
  }
 
  getpublicize(): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syspublicize.php';
    let data;
    data = {
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudpublicize(vdata: any): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'syspublicize.php';
   
    return this.http.post<FeedBack>(apiUrl, vdata, { headers: header });
  }

}
 
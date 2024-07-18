import { Injectable } from '@angular/core';
import { place } from '../models/place';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MtdService {

  constructor(private http: HttpClient) { 
   
  }


  getplace(): Observable<place[]> {
    let apiUrl = "./assets/data/place.json";
    return this.http.get<place[]>(apiUrl);
  }
}

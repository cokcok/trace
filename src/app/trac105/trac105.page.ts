import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../sv/config.service';
import { Trac1Service } from '../sv/trac1.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms"; 
import { Subscription } from "rxjs";
@Component({
  selector: 'app-trac105',
  templateUrl: './trac105.page.html',
  styleUrls: ['./trac105.page.scss'],
})
export class Trac105Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  typesearch:boolean = false;
  constructor( private tracSv: Trac1Service,public configSv:ConfigService) { }

  ngOnInit() {
  }

}

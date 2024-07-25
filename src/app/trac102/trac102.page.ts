import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from "rxjs";
import { Trac1Service } from '../sv/trac1.service';
import { ConfigService } from '../sv/config.service';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
@Component({
  selector: 'app-trac102',
  templateUrl: './trac102.page.html',
  styleUrls: ['./trac102.page.scss'],
})
export class Trac102Page implements OnInit {
  trac1_id:string;merchantname:string
  sub: Subscription;
  data = []; page = 0; maxpadding: number; limit = 50;

  ionicForm: FormGroup;isSubmitted = false;  portControl: FormControl;

  constructor(private route: ActivatedRoute, private tracSv: Trac1Service,public formBuilder: FormBuilder,) {
    this.route.queryParams.subscribe((res) => {
      //let item = JSON.parse(res.value)
     // console.log(res,res['trace1_id']);
     //this.group_name = item[0]['group_name'];
      this.trac1_id= res['trace1_id'];
      this.merchantname = res['merchantname'];

     
    });
    
   }

  ngOnInit() {
   // this.trac1_id = this.route.snapshot.paramMap.get('trace1_id');
 
    this.ionicForm = this.formBuilder.group({    
      trac1_id: [this.trac1_id],
    });
    //console.log(this.ionicForm.value );
    this.loaddata();
  }

  



  loaddata(padding?: number, infiniteScroll?){
    let datalimit;
    this.sub = this.tracSv
    .gettrac1_read('read',this.trac1_id)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data);
        //this.maxpadding = data["maxpadding"];
       // datalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object. assign({}, item)));
          console.log( this.data);
        // if (infiniteScroll) {
        //   infiniteScroll.target.complete();
        // }
      }else{
        this.maxpadding = 0;
      }
    });
  }

  // SearchData(padding, infiniteScroll?){
  //   if (padding === 0){this.data = []; }
  //   this.sub = this.tracSv
  //   .getpo(this.ionicForm.value, padding, this.limit)
  //   .subscribe((data) => {
  //     if (data !== null) {
  //       // console.log(data.data_detail);
  //        this.maxpadding = data["maxpadding"];
  //        this.maxdatalimit = data["limit"];
  //        this.data =  this.data.concat(data.data_detail.map((item) => Object.assign({}, item)));

  //        if (infiniteScroll) {
  //          infiniteScroll.target.complete();
  //        }
  //     }else{
  //       this.maxpadding = 0; this.maxdatalimit = 0;
  //       this.data = [];
  //     }
  //   });
  //   // console.log(this.data);
  // }



  doInfinite(infiniteScroll) {
    this.page++;
    // console.log( this.page,this.maxpadding);
    // this.SearchData(this.page * this.limit, infiniteScroll);
    // this.loaddata(this.page * 10, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      // this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }else{
      //this.SearchData(this.page * this.limit, infiniteScroll);
    }
  }

}

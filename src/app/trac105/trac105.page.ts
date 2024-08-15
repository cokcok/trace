import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../sv/config.service';
import { Trac1Service } from '../sv/trac1.service';
import { FormGroup } from "@angular/forms"; 
import { Subscription } from "rxjs";
import {  NavController,AlertController, LoadingController } from '@ionic/angular';
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
  constructor( private tracSv: Trac1Service,public configSv:ConfigService,private navCtrl: NavController) { 
    this.loaddata();
  }

  ngOnInit() {
  }
 

  loaddata(padding?: number, infiniteScroll?){
    let item = {
      'type_sql' : 'readall',
      'startrow' : 1,
      'endrow' : this.limit,      
    }
    this.sub = this.tracSv
    .gettrac1_read(item)
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


async  Adduser()
  { 
    this.navCtrl.navigateForward(['/trac101'],{
      queryParams: {
        //trace1_id : data.id,
        //merchantname: this.ionicForm.controls['merchantname'].value
        } ,skipLocationChange:true
      });

  }

 
  selectData(id,merchantname) {
    //console.log(id);
    this.navCtrl.navigateForward(['/trac102'],{
      queryParams: {
        trace1_id : id,
        merchantname: merchantname
        } //,skipLocationChange:true
      });
  }
 

  selectDataMain(id) {
    this.navCtrl.navigateForward(['/trac101'],{
      queryParams: {
        trace1_id : id,
        } //,skipLocationChange:true
      });
  }


  reloadData()
  {
    this.data = [];
    this.loaddata();
  }
}

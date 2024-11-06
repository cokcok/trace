import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ConfigService } from '../sv/config.service';
import { Subscription } from 'rxjs';
import { LoadingController } from '@ionic/angular';
import { Trac3Service } from '../sv/trac3.service';

@Component({
  selector: 'app-checkquota',
  templateUrl: './checkquota.page.html',
  styleUrls: ['./checkquota.page.scss'],
})
export class CheckquotaPage implements OnInit {
  ionicForm: FormGroup;isSubmitted = false; 
  data = []; page = 0;maxpadding:number;limit = 50;
  sub: Subscription; maxdatalimit=0;filterTerm: string;
  portControl: FormControl; portssearch = [];
  portControl_year: FormControl; portssearch_year = [];
  currentYear = new Date().getFullYear()+543;
  constructor(public formBuilder: FormBuilder, public configSv: ConfigService,public trac3Sv:Trac3Service,private loadingController: LoadingController) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.portControl_year = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      typeserch_id: this.portControl,
      typeserch_year: this.portControl_year,
      txtserach: ["",[Validators.required]],
      type_sql : [""],
      limit:[""],
    }); 
    this.loaddata_searchtype();
    this.loaddata_searchyear();
  }


  get errorControl() {
    return this.ionicForm.controls;
  }

  loaddata_searchtype() {
    this.portssearch = [
      {id: 0,search_type: 'เลขบัตรปชช.'},
      {id: 1,search_type: 'เลขขึ้นทะเบียนเกษตรกร'},
      {id: 2,search_type: 'เลข GID'},
    ];
  }

  loaddata_searchyear(){
    for (let i = this.currentYear-5; i<=this.currentYear+1; i++)
      {
        this.portssearch_year.push(
          {
            id: i ,
            search_year:i,
          }

        );
      }
      const self = this;
      const value_a = this.portssearch_year.filter(function (item1) {
        return item1.id == self.configSv.year;
      })[0];

      this.portControl_year.setValue(value_a);   
  }


  async  SearchData(padding,infiniteScroll?){
    //let datalimit;
    this.ionicForm.controls['type_sql'].setValue('checkquota');
    this.ionicForm.controls['limit'].setValue(padding);
    await this.loadingController
      .create({
        message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่',
      })
      .then((loading) => {
        loading.present();

        this.sub = this.trac3Sv.gettrac_quota(this.ionicForm.value).subscribe((data) => {
          if (data !== null) {
            //console.log(data);
            this.maxpadding = data["maxpadding"];
            this.maxdatalimit = data["limit"];
           // datalimit = data["limit"];
            this.data = this.data.concat(
              data.data_detail.map((item) => Object.assign({}, item))
            );
            // for (let i = 0; i < datalimit; i++) {
            //   //console.log(data['data_detail'][i]['id']);
            //   this.data.push({
            //     'seller_idc': data['data_detail'][i]['iseller_idcd'],
            //     'appno': data['data_detail'][i]['appno'],
            //     'seller_name': data['data_detail'][i]['seller_name'],
            //     'gid': data['data_detail'][i]['gid'],
            //     'area_rai': data['data_detail'][i]['area_rai'],
            //     'all_quota': data['data_detail'][i]['all_quota'],
            //     'all_volume': data['data_detail'][i]['all_volume'],                
            //   });
            // }

            loading.dismiss();
            if (infiniteScroll) {
              infiniteScroll.target.complete();
            }
          } else {
            this.maxpadding = 0;
            loading.dismiss();
          }
        });
      }); 


    // this.sub = this.poSv
    // .searchpo(this.ionicForm.value,padding,this.limit)
    // .subscribe((data) => {
    //   if (data.data_detail !== null) {
    //     // console.log(data.data_detail);
    //      this.maxpadding = data["maxpadding"];
    //      this.maxdatalimit = data["limit"];
    //      this.data =  data.data_detail.map((item) => Object.assign({}, item));
    //   }else{
    //     this.maxpadding = 0;this.maxdatalimit=0;
    //     this.data = [];
    //   }
    // });
  }

  
  doInfinite(infiniteScroll) {
    this.page++;
    //console.log(this.page, this.maxpadding);
    /*  setTimeout(() => {
       this.loaddata(this.page * this.limit , infiniteScroll);     
     },1000); */
    this.SearchData(this.page * this.limit, infiniteScroll);
    if (this.page === this.maxpadding) {
      infiniteScroll.target.disabled = true;
      this.configSv.ChkformAlert('ไม่พบข้อมูลแล้ว');
    }
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
    
  }

}

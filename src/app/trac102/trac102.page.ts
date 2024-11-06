import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { Trac1Service } from '../sv/trac1.service';
import { ConfigService } from '../sv/config.service';
import { FormBuilder, FormGroup,  FormControl, } from "@angular/forms";
import { Trac103Page } from '../trac103/trac103.page';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { Trac104Page } from '../trac104/trac104.page';

@Component({ 
  selector: 'app-trac102',
  templateUrl: './trac102.page.html',
  styleUrls: ['./trac102.page.scss'],
})
export class Trac102Page implements OnInit {
  trac1_id:string;merchantname:string;filterTerm: string;
  product_id:string; product_price: number; flg_open:any;
  sub: Subscription;
  data = []; page = 0; maxpadding: number; limit = 50;
  frist = null;
  ionicForm: FormGroup;isSubmitted = false;  portControl: FormControl;

  constructor(private route: ActivatedRoute, private tracSv: Trac1Service,public formBuilder: FormBuilder, private modalCtrl: ModalController,private loadingController: LoadingController,public configSv:ConfigService,private navCtrl: NavController ) {
    this.route.queryParams.subscribe((res) => {
      //let item = JSON.parse(res.value)
      //console.log(res,res['trace1_id']);
     //this.group_name = item[0]['group_name'];

      this.trac1_id= res['trace1_id'];
      this.merchantname = res['merchantname'];
      this.product_id = res['product_id'];
      this.product_price = res['product_price'];
      this.flg_open = res['flg_open'];

     
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

  


//checked : boolean = true;
 async loaddata(padding?: number, infiniteScroll?){
    let datalimit;
    let item = {
      'type_sql' : 'read',
      'trac1_id' : this.trac1_id,
      
    }
    await this.loadingController.create({
      message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
    }).then((loading) => {

      loading.present();

    this.sub = this.tracSv
    .gettrac1_read(item)
    .subscribe((data) => {
      if (data !== null) {
        //console.log(data);
        //this.maxpadding = data["maxpadding"];
       // datalimit = data["limit"];
        this.data =  this.data.concat(data.data_detail.map((item) => Object. assign({}, item)));
        //console.log( this.data);
        
        loading.dismiss();      
        // if (infiniteScroll) {
        //   infiniteScroll.target.complete();
        // }
      }else{
        this.maxpadding = 0;
        loading.dismiss();      
      }
    });
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


  async checklistForm(indexland,indexsell){
 
   
    const item   = this.data[indexsell]['detail_land'][indexland];
    // console.log(item);
     const modal = await this.modalCtrl.create({
       component: Trac103Page,
       cssClass: 'my-modal',
       //componentProps: {id, po_running, tmppostatus: item[0].po_status},
       componentProps: {data : item, product_id : this.product_id, product_price : this.product_price,flg_open:this.flg_open},
     });
     await modal.present();
     const {data, role} = await modal.onWillDismiss();
     //console.log(data,role);
     if (role === 'submit'){
      //console.log(  data['selected_land'] );
      let showtxt = 'ประเมินแล้ว ';
     
      data['risk'] === 0 ? showtxt += '/ไม่ผ่าน EUDR' : showtxt += '/ผ่าน EUDR';
      data['selected_land'] === true ? showtxt += '/นำเข้า trace3': null;
      // item.text_status = 'ประเมินแล้ว/ผ่าน EUDR/นำเข้า trace3';
      item.trac1_land_assessment_id = data['trac1_land_assessment_id'];
      item.text_status = showtxt;
      item.frist = 0 ;
      //this.frist = 0;
     }else if (role === 'cancel'){  
       //item['code'] = '555';
       //console.log(item['code'],item);
     }
    
   }

   async Adduser()
   {
    let item = {
      'type_sql' : 'AddUser',
      'trac1_id' : this.trac1_id,
      'running' :  this.data.length+1,
     
    }
    // console.log(data);

    const modal = await this.modalCtrl.create({
      component: Trac104Page,
      cssClass: 'my-modal',
      //componentProps: {id, po_running, tmppostatus: item[0].po_status},
      componentProps: {data : item},
    });
    await modal.present();
    const {data, role} = await modal.onWillDismiss();
    console.log(data,role);
    if (role === 'submit'){        
        this.data.unshift(data.data_detail[0]);
        //this.data.unshift(data.data_detail.map((item) => Object. assign({}, item)));
        //this.data =  this.data.concat(data.data_detail.map((item) => Object. assign({}, item)));
    }

   }

   async reloadData(indexsell)
   {
    const item   = this.data[indexsell];
    //const itemLand   = this.data[indexsell]['detail_land'];  
   // console.log(this.data ,this.data[indexsell]['detail_land']);
    let data = {
      'type_sql' : 'reloadData',
      'seller_id' : item.seller_id,
      'seller_idc' : item.seller_idc,
      'trac1_id' : this.trac1_id,
      'seller_name' : item.seller_name ,
      'running' : item.running,
      'empid' : this.configSv.emp_id,
    }
    this.data[indexsell]['detail_land'] = [];
   //console.log(this.data);
    await this.loadingController.create({
      message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
    }).then((loading) => {

      loading.present();
      this.sub = this.tracSv
      .trac1_reloadData(data)
      .subscribe((data) => {
          //delete this.data[indexsell]['detail_land']
          //console.log(data.data_detail[0]['appno']);
          this.data[indexsell]['appno'] = data.data_detail[0]['appno'];
          this.data[indexsell]['detail_land'] =  this.data[indexsell]['detail_land'].concat(data.data_detail[0]['detail_land'].map((item) => Object. assign({}, item)));
          loading.dismiss();      
      });
      
    }); 


   }

   async  selectData(e,indexland,indexsell)
  { 
    const item   = this.data[indexsell]['detail_land'][indexland];
    let selected_land;
    if(e.currentTarget.checked === false){
      item.text_status =  item.text_status +  "/นำเข้า trace3";
      selected_land = 1;
    }else{
      item.text_status =  item.tmp_text_status;
      selected_land = null;
    }
    //console.log(item);
    let data = {
      'type_sql' : 'updateLand',
      'trace1_land_id' : item.id,
      'selected_land' : selected_land
    }

    await this.loadingController.create({
      message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
    }).then((loading) => {

      loading.present();
      this.sub = this.tracSv
      .crudtrac1_selectland(data)
      .subscribe((data) => {
      
          loading.dismiss();      
      });
      loading.dismiss();
    }); 
  }

   async Printuser()
   {

    await this.loadingController.create({
      message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
    }).then((loading) => {

      loading.present();
      let item = {
        'type_sql' : 'readexcel',
        'trac1_id' : this.trac1_id,
        
      }
      this.sub = this.tracSv
      .gettrac1_read(item)
      .subscribe((data) => {        
        if (data !== null) {   
          this.loadexcel(data.data_detail.map((item) => Object.assign({}, item)))
          loading.dismiss();
        }
        else
        {
          this.configSv.ChkformAlert('ไม่พบข้อมูล');
          loading.dismiss();
        }

      });
    });
   }

   loadexcel(data) {
   let currentDate = new Date().toLocaleDateString();
   let currentTime = new Date().toLocaleTimeString();
    const ws_name = 'sheetname';
    const wb: WorkBook = { SheetNames: [], Sheets: {} };
    //const ws: any = utils.json_to_sheet(this.table);
    const ws: any = utils.json_to_sheet(data);
    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;
    const wbout = write(wb, {
      bookType: 'xlsx', bookSST: true, type:
        'binary'
    });


    function s2ab(s) {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      };
      return buf;
    }

    saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), this.merchantname + currentDate + ' ' + currentTime + '.xlsx');

  }

  back(){
    //this.navCtrl.navigateForward('/trac105');
    this.navCtrl.navigateForward(['/trac105'], {
      queryParams: {
        //  value : JSON.stringify(this.data.filter(function (val) { return val.id == id;})),
        //  xxx :'aaa',
        //trace1_id: data.id,
       // merchantname: this.ionicForm.controls['merchantname'].value,
      }, skipLocationChange:true
    });
  }
}

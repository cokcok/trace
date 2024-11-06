import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../sv/config.service';
import { Trac1Service } from '../sv/trac1.service';
import { Subscription } from "rxjs";
import { ModalController, NavController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { utils, write, WorkBook } from 'xlsx';
import { saveAs } from 'file-saver';
import { Trac301Page } from '../trac301/trac301.page';

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
  portControl: FormControl; portssearch = [];
  portControl_year: FormControl; portssearch_year = [];
  constructor( private tracSv: Trac1Service,public configSv:ConfigService,private navCtrl: NavController,private loadingController: LoadingController,private modalCtrl: ModalController,public formBuilder: FormBuilder) { 
    this.loaddata();this.loaddata_searchtype();
  } 

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
   // this.portControl_year = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      typeserch_id: this.portControl,
     // typeserch_year: this.portControl_year,
      txtserach: ["",[Validators.required]],
      type_sql : [""],
      limit:[""],
    }); 
  }
 
 
async  loaddata(padding?: number, infiniteScroll?){
    let item = {
      'type_sql' : 'readall',
      'startrow' : 1,
      'endrow' : this.limit,   
      'dept_code' : this.configSv.dept_code,   
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
          loading.dismiss();
          //console.log( this.data);
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


async  Adduser()
  { 
    this.navCtrl.navigateForward(['/trac101'],{
      queryParams: {
        //trace1_id : data.id,
        //merchantname: this.ionicForm.controls['merchantname'].value
        } ,skipLocationChange:true
      });

  }

 
  selectData(id,merchantname,product_id,product_price,flg_open) {
    //console.log(id);
    this.navCtrl.navigateForward(['/trac102'],{
      queryParams: {
        trace1_id : id,
        merchantname: merchantname,
        product_id : product_id,
        product_price : product_price,
        flg_open : flg_open,
        } ,skipLocationChange:true
      });
  } 

 async Importscales(id,merchantname,flg_open) {
    //console.log(id);
    // this.navCtrl.navigateForward(['/trac301'],{
    //   queryParams: {
    //     trace1_id : id,
    //     merchantname: merchantname,
    //     flg_open : flg_open,
    //     } ,skipLocationChange:true
    //   });

      const item = this.data.filter((val) => val.id === id);
     
     const modal = await this.modalCtrl.create({
       component: Trac301Page,
       cssClass: 'my-modal',
       //componentProps: {id, po_running, tmppostatus: item[0].po_status},
       componentProps: {trace1_id : id, merchantname : merchantname, flg_open : flg_open},
     });
     await modal.present();
     const {data, role} = await modal.onWillDismiss();

     if(role === 'submit')
     {
      item[0].flg_open = data;
   
     }

  }
 

  selectDataMain(id,flg_open) {
    this.navCtrl.navigateForward(['/trac101'],{
      queryParams: {
        trace1_id : id,
        flg_open : flg_open,
        } ,skipLocationChange:true
      });
  }


  reloadData()
  {
    this.data = [];
    this.loaddata();
  }

  async Printuser(id,merchantname)
  {
   await this.loadingController.create({
     message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
   }).then((loading) => {

     loading.present();
     let item = {
       'type_sql' : 'readexcel',
       'trac1_id' : id,
        
     }
     this.sub = this.tracSv
     .gettrac1_read(item)
     .subscribe((data) => {        
       if (data !== null) {   
         this.loadexcel(data.data_detail.map((item) => Object.assign({}, item)),merchantname)
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

  loadexcel(data,merchantname) {
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

   saveAs(new Blob([s2ab(wbout)], { type: 'application/octet-stream' }), merchantname + currentDate + ' ' + currentTime + '.xlsx');

 }


 loaddata_searchtype() {
  this.portssearch = [
    {id: 0,search_type: 'ชื่อผู้ค้า'},
    {id: 1,search_type: 'ชื่อผู้ดำเนินการ'},
    {id: 2,search_type: 'เลขบัตรปชช.'},
  ];
}

get errorControl() {
  return this.ionicForm.controls;
}

SearchData(padding)
{

}

}

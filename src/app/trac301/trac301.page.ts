import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, LoadingController,NavParams,AlertController } from '@ionic/angular';
import { ConfigService } from '../sv/config.service';
import { FormBuilder, FormGroup,  FormControl,Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
import * as XLSX from 'xlsx';
import { Trac3Service } from '../sv/trac3.service';


@Component({
  selector: 'app-trac301',
  templateUrl: './trac301.page.html',
  styleUrls: ['./trac301.page.scss'],
})
export class Trac301Page implements OnInit {
  trac1_id:string;merchantname:string;filterTerm: string;
  sub: Subscription;flg_open:number;
  data = []; page = 0; maxpadding: number; limit = 50;
  frist = null;  tmpdata = [];
  ionicForm: FormGroup;isSubmitted = false;  portControl: FormControl;
  datePickerObj: any = {}; countimport = 0;
  constructor(private route: ActivatedRoute,public formBuilder: FormBuilder, private modalCtrl: ModalController,private loadingController: LoadingController,public configSv:ConfigService,public trac3Sv:Trac3Service,public navParams : NavParams,
    private alertCtrl: AlertController) {

    this.trac1_id = this.navParams.get('trace1_id');
    this.merchantname = this.navParams.get('merchantname');
    this.flg_open = this.navParams.get('flg_open');
    
   }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      //typeserch_id: ["1"],
      trac1_id : [this.trac1_id],
      saledate: ["",[Validators.required]],
      year: [this.configSv.year],
      empid: [this.configSv.emp_id],
      tmpdata: [],
      type_sql: [],
      //dataall:[],
    }); 
    this.fndate();
    this.loaddata();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  fndate(){
    this.datePickerObj = {
      inputDate: '',
      // showTodayButton: false,
       closeOnSelect: true,
      // disableWeekDays: [],
      // mondayFirst: true,
       setLabel: 'เลือก',
       todayLabel: 'วันที่ปัจจุบัน',
       closeLabel: 'ปิด',
     // disabledDates: disabledDates,
      // titleLabel: 'Select a Date',
       monthsList: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'],
       weeksList: [ 'อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ','ส'],
      dateFormat: 'DD/MM/YYYY',
      btnProperties: {
        expand: 'block', // "block" | "full"
        fill: '', // "clear" | "default" | "outline" | "solid"
        size: '', // "default" | "large" | "small"
        disabled: '', // boolean (default false)
        strong: '', // boolean (default false)
        color: 'success'
        // "primary", "secondary", "tertiary", "success", "warning", "danger", "light", "medium", "dark" , and give color in string
      }
    };
  }

  onInputClick(event) {
    event.target.value = '';
  }

  onFileChange(evt: any) {


    Object.keys(this.data).forEach(key=> {
      this.data[key]['volume']   = null;
    });

    /* wire up file reader */
    var file = evt.srcElement.files[0];

    //console.log(file);
    if (typeof file !== 'undefined') {
      var HTMLOUT = document.getElementById('htmlout');
      var xlsxcount = document.getElementById('xlsxcount');
      const target: DataTransfer = <DataTransfer>evt.target;
      if (target.files.length !== 1)
        throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.tmpdata = XLSX.utils.sheet_to_json(ws, { header: 1 });

        xlsxcount.innerHTML =
          'มีข้อมูลนำเข้า จำนวน ' + (this.tmpdata.length - 1) + ' รายการ';
        // HTMLOUT.innerHTML = '';
        // wb.SheetNames.forEach(function (sheetName) {
        //   var htmlstr = XLSX.write(wb, {
        //     sheet: sheetName,
        //     type: 'string',
        //     bookType: 'html',
        //   });
        //  HTMLOUT.innerHTML += htmlstr;
        // });



        let i=0;
        Object.keys(this.data).forEach(key=> {
          Object.keys(this.tmpdata).forEach(key1=> {
           // console.log(this.tmpdata[key1]);
             if ( typeof this.tmpdata[key1][4] !==  'undefined'){
              //console.log(this.data[key]['volume'] )
                let gid = this.tmpdata[key1][3].toString().replace(/\s+|\-/g, "")
               if( this.data[key]['gid']  === gid ){
                 this.data[key]['volume']   = this.tmpdata[key1][4];
                 i++;
                //  if ( typeof this.data[key]['volume']  !==  'undefined'){
                //    i++;
                //   }
               }              
             }
         });
       });
       this.countimport = i;
      };
     



      //reader.readAsBinaryString(target.files[0]);
      reader.readAsArrayBuffer(target.files[0]);
      //xlxscout.innerText = " มีข้อมูลนำเข้าจำนวน "  this.tmpdata.length-2

      evt.value = '';
      file.value = '';
    }
  }


  async loaddata(padding?: number, infiniteScroll?){
    let datalimit;
    let item = {
      'type_sql' : 'readtrac3',
      'trac1_id' : this.trac1_id,
      
    }
    await this.loadingController.create({
      message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
    }).then((loading) => {

      loading.present();

    this.sub = this.trac3Sv
    .gettrac3_read(item)
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


 async  submitForm(){
    this.isSubmitted = true;
    if(this.data.length !== this.countimport)
    {
      this.configSv.ChkformAlert('ข้อมูลที่นำเข้ามีไม่ครบ');
      //alert.present();
      return false;
    }

    let txtalert1 = ''; let err = false;
    //console.log(this.data);
    Object.keys(this.data).forEach(key=> {
        if((typeof (this.data[key]['volume']))  !== 'number' ) {
          err = true;
          txtalert1 += 'ลำดับที่ ' + (Number(key)+1)+ ' มีปริมาณรวม ที่ไม่ใช่ ค่าตัวเลข ' + '\n';
        }
      });

      if (err == false) {
      const confirm =  await this.alertCtrl.create({
        header: 'เมื่อยืนยันข้อมูลแล้ว จะไม่สามารถแก้ไขข้อมูลได้อีก คุณต้องการยืนยันใช่ไหม?' ,
        buttons: [{
          text: 'ยกเลิก',
          handler: (data: any) => {
             console.log('cancel ', data);
          }
        },
        {
          text: 'ยืนยัน',
            handler: (data: any) => {
              document.getElementById("htmlerr").innerText = null;
              this.ionicForm.controls['type_sql'].setValue('insert');
              this.ionicForm.controls['tmpdata'].setValue(this.data);
              this.loadingController.create({
                message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
              }).then((loading) => {
                loading.present();
                if (!this.ionicForm.valid) {
                  console.log("Please provide all the required values!");
                  loading.dismiss();
                  return false;
                } else {           
                  this.sub = this.trac3Sv
                  .crudtrac3(this.ionicForm.value)
                  .subscribe((data) => {
                    if(data.status === 'ok')
                      {
                        loading.dismiss();             
                        this.modalCtrl.dismiss('0', 'submit');
                      }
                      else
                      {
                        this.configSv.ChkformAlert(data.status);
                        loading.dismiss();
                      } 
                   });
                } 
                loading.dismiss();
              });
            }
        }]
      });
      confirm.present();
      }
      else
      {
        document.getElementById("htmlerr").innerText = 'ไม่สามารนำเข้าข้อมูลได้ เนื่องจาก \n' + txtalert1;
      }   
  }


  back(){
    this.modalCtrl.dismiss();  
  }

}

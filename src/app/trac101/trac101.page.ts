import { Component, OnInit } from '@angular/core';
import {
  NavController,
  AlertController,
  LoadingController,
  ModalController,
} from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { Trac1Service } from '../sv/trac1.service';
import { MtdService } from '../sv/mtd.service';
import { PlaceService } from '../sv/place.service';
import { ConfigService } from '../sv/config.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { IonicSelectableComponent } from 'ionic-selectable';
//SelectSearchableComponent

@Component({
  selector: 'app-trac101',
  templateUrl: './trac101.page.html',
  styleUrls: ['./trac101.page.scss'],
})
export class Trac101Page implements OnInit {
  ionicForm: FormGroup;
  sub: Subscription;
  portControl_product: FormControl;
  ports_product: any;
  portControl_province: FormControl;
  ports_province: any;
  portControl_amphur: FormControl;
  ports_amphur: any;
  portControl_tambom: FormControl;
  ports_tambon: any;
  tmpdata = [];
  isSubmitted = false;
  trac1_id: string; 
  flg_open:number;
  constructor(
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private tracSv: Trac1Service,
    protected placeSv: PlaceService,
    public configSv: ConfigService,
    private navCtrl: NavController,
    private router: Router,
    private loadingController: LoadingController,
    public mtdSv: MtdService,
    private modalCtrl: ModalController
  ) {
    this.route.queryParams.subscribe((res) => {
      this.trac1_id = res['trace1_id'];
      this.flg_open = res['flg_open'];
      
    });
   
   
  }

  ngOnInit() {

   

    this.portControl_product = this.formBuilder.control(
      '',
      Validators.required
    );
    this.portControl_province = this.formBuilder.control(
      '',
      Validators.required
    );
    this.portControl_amphur = this.formBuilder.control('', Validators.required);
    this.portControl_tambom = this.formBuilder.control('', Validators.required);
    this.ionicForm = this.formBuilder.group({
      rubbermarket: ['สำนักงานตลาดยางพารา.....', [Validators.required]],
      merchantname: ['', [Validators.required]],
      appno: [''],
      operatorname: ['', [Validators.required]],
      operatorname_idcard: ['', [Validators.required]],
      operatorname_tel: ['', [Validators.required]],
      //place_rubber : ['5', [Validators.required]],
      // place_rubber1 : ['5', [Validators.required]],
      village: ['', [Validators.required]],
      moo: [''],
      province: this.portControl_province,
      amphur: this.portControl_amphur,
      tambon: this.portControl_tambom,
      zipcode: ['', [Validators.required]],
      mtdproduct_id: this.portControl_product,
      tmpdata: ['', [Validators.required]],
      empid: [this.configSv.emp_id],
      dept_code: [this.configSv.dept_code],
      year : [this.configSv.year],
      type_sql: [''],
    });
    this.loaddata_product(0);
    this.loadprovince();
  }

  loadprovince() {
    let item = {
      type_sql: 'province',
    };
    this.mtdSv.getpro_amp_tam(item).subscribe((data) => {
      this.ports_province = data.data_detail.map((item) =>
        Object.assign({}, item)
      );
    });
  }

  portChange_prov(event: { component: IonicSelectableComponent; value: any }) {
    let port = event.value;

    let item = {
      type_sql: 'amphur',
      prov_code: port.code,
    };
    this.mtdSv.getpro_amp_tam(item).subscribe((data) => {
      this.ports_amphur = data.data_detail.map((item) =>
        Object.assign({}, item)
      );
    });
    this.portControl_amphur.reset();
    this.portControl_tambom.reset();
  }

  portChange_amp(event: { component: IonicSelectableComponent; value: any }) {
    let port = event.value;
    let item = {
      type_sql: 'tambon',
      prov_code: this.ionicForm.controls['province'].value.code,
      amp_code: port.code,
    };

    this.mtdSv.getpro_amp_tam(item).subscribe((data) => {
      this.ports_tambon = data.data_detail.map((item) =>
        Object.assign({}, item)
      );
    });
    this.portControl_tambom.reset();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  onInputClick(event) {
    event.target.value = '';
  }

  onFileChange(evt: any) {
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
        //console.log(this.tmpdata,this.tmpdata.length);
        xlsxcount.innerHTML =
          'มีข้อมูลนำเข้า จำนวน ' + (this.tmpdata.length - 1) + ' รายการ';
        HTMLOUT.innerHTML = '';
        wb.SheetNames.forEach(function (sheetName) {
          var htmlstr = XLSX.write(wb, {
            sheet: sheetName,
            type: 'string',
            bookType: 'html',
          });
          HTMLOUT.innerHTML += htmlstr;
        });
      };
      //reader.readAsBinaryString(target.files[0]);
      reader.readAsArrayBuffer(target.files[0]);
      //xlxscout.innerText = " มีข้อมูลนำเข้าจำนวน "  this.tmpdata.length-2

      evt.value = '';
      file.value = '';
    }
  }

  loaddata_product(padding: number, infiniteScroll?) {
    let vdata = {
      //'padding': padding,
      //'limit': limit,
      //'condition':condition,
      'type_sql': 'read'
    }

    this.sub = this.mtdSv.getmtd(0, vdata).subscribe((data) => {
      if (data !== null) {
        this.ports_product = data.data_detail.map((item) =>
          Object.assign({}, item)
        );
        //const item = this.ports_product.filter((val) => val.id === this.configSv.emp_id)[0];
        // console.log(item);
        // this.portControl_sale.setValue(item);
      }
    });
  }

  async submitForm() {
    this.isSubmitted = true;
    this.ionicForm.controls['tmpdata'].setValue(this.tmpdata);
    this.ionicForm.controls['type_sql'].setValue('insert');
    //console.log(this.ionicForm.value);
    await this.loadingController
      .create({
        message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่',
      })
      .then((loading) => {
        loading.present();

        if (!this.ionicForm.valid) {
          console.log('Please provide all the required values!');
          loading.dismiss();
          return false;
        } else {
          this.sub = this.tracSv
            .crudtrac1(this.ionicForm.value)
            .subscribe((data) => {
              if (data.status === 'ok') {
                //this.router.navigateByUrl('/trac102/'+ data.id + '/'+ this.ionicForm.value);
                // this.router.navigate(['/trac102/'+ data.id], {
                //   skipLocationChange: true,
                // });
                this.navCtrl.navigateForward(['/trac102'], {
                  queryParams: {
                    //  value : JSON.stringify(this.data.filter(function (val) { return val.id == id;})),
                    //  xxx :'aaa',
                    trace1_id: data.id,
                    merchantname: this.ionicForm.controls['merchantname'].value,
                    product_id: this.ionicForm.controls['mtdproduct_id'].value.id,
                    product_price: this.ionicForm.controls['mtdproduct_id'].value.price,
                  }, skipLocationChange:true
                });
                this.ionicForm.reset();
                loading.dismiss();
              } else {
                this.configSv.ChkformAlert(data.status);
                loading.dismiss();
              }

              // this.navCtrl.navigateForward(['/trac102', {
              //   trace1_id: data.id,

              //   }]);
            });
        }
        //loading.dismiss();
      });
  }


  async loaddata_edit() {
    if (typeof this.trac1_id !== 'undefined') {
      //console.log('a');
      let item = {
        type_sql: 'readmain',
        trac1_id: this.trac1_id,
      };

      await this.loadingController
        .create({
          message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่',
        })
        .then((loading) => {
          loading.present();
          this.sub = this.tracSv.gettrac1_read(item).subscribe((data) => {
            //console.log(data);
            data.data_detail.forEach((item) => {
              for (const [key, value] of Object.entries(item)) {
                if (key === 'mtd_product_id') {
                  const value_a = this.ports_product.filter(function (item1) {
                    return item1.id === value;
                  })[0];
                  this.portControl_product.setValue(value_a);
                } else if (key === 'prov_code') {
                  const value_a = this.ports_province.filter(function (item1) {
                    return item1.code === value;
                  })[0];
                  this.portControl_province.setValue(value_a);               
                } else if (key === 'amp_code') {
                  let vitem = {
                    type_sql: 'amphur',
                    prov_code: this.ionicForm.controls['province'].value.code,
                  };
                  this.mtdSv.getpro_amp_tam(vitem).subscribe((data) => {
                    this.ports_amphur = data.data_detail.map((item) =>
                      Object.assign({}, item)
                    );
                    const value_a = this.ports_amphur.filter(function (item1) {
                      return item1.code === value;
                    })[0];
                    this.portControl_amphur.setValue(value_a);

                  });  

                } else if (key === 'tam_code') {
                  let vitem = {
                    type_sql: 'tambon',
                    prov_code: this.ionicForm.controls['province'].value.code,
                    amp_code: item['amp_code'],
                  };
                 
                  this.mtdSv.getpro_amp_tam(vitem).subscribe((data) => {
                    this.ports_tambon = data.data_detail.map((item) =>
                      Object.assign({}, item)
                    );
                    const value_a = this.ports_tambon.filter(function (item1) {
                      return item1.code === value;
                    })[0];
                    this.portControl_tambom.setValue(value_a);
                  });
                } else {
                  this.ionicForm.controls[key].setValue(value);
                }
              }
            });
            loading.dismiss();
          });
        });
    }
  }

  ionViewDidEnter() {
    this.loaddata_edit();
  }
}

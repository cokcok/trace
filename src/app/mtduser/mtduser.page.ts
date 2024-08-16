import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ConfigService } from '../sv/config.service';
import { Subscription } from 'rxjs';
import { AlertController,LoadingController } from '@ionic/angular';
import { SysmenuService } from '../sv/sysmenu.service';
import { MtdService } from '../sv/mtd.service';
@Component({
  selector: 'app-mtduser',
  templateUrl: './mtduser.page.html',
  styleUrls: ['./mtduser.page.scss'],
})
export class MtduserPage implements OnInit {
  ionicForm: FormGroup; isSubmitted = false; 
  portControl: FormControl;ports: any;
  sub: Subscription; filterTerm: string;
  page = 0; maxpadding = 0; limit = 50;
  id: number;
  data = [];
  constructor(public formBuilder: FormBuilder, public configSv: ConfigService, public sysmenuSv: SysmenuService, private alertCtrl: AlertController, private loadingController: LoadingController,public mtdSv: MtdService,) { }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      id: [null],
      emp_id: [null],
      emp_code: [],
      tmpemp_code: [],
      emp_name: [ { value: '', disabled: true } ],
      deptname: [ { value: '', disabled: true } ],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      group_name: [],
      group_id: this.portControl,
      empid: [this.configSv.emp_id],
      highlight: [""],
      type_sql: [null],
    });
    this.loaddata_group();
  }

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
  }

  loaddata_group() {
    let data = {
      'type_sql' : 'read',
    }
    this.sub = this.sysmenuSv.getsysgroup(data).subscribe(
      (data) => {
      this.ports =  this.data.concat(data.data_detail.map((item) => Object. assign({}, item)));
        }      
    );
  }

  SearchEmp(code){
    //console.log(code,this.ionicForm.controls['emp_code'].value);
    let item = {
      type_sql: 'search',
      emp_code: this.ionicForm.controls['emp_code'].value,
    };
    this.mtdSv.getmtd(1,item).subscribe((data) => {
      if (data.data_detail[0]['group_id'] === null)
      {
        data.data_detail.forEach((item) => {
          for (const [key, value] of Object.entries(item)) {
            this.ionicForm.controls[key].setValue(value);
          }
        });
        this.ionicForm.controls['tmpemp_code'].setValue(data.data_detail[0]['emp_code']);
        this.ionicForm.controls['username'].setValue(data.data_detail[0]['emp_code']);
        this.ionicForm.controls['password'].setValue(data.data_detail[0]['emp_code']);
      }
      else
      {
        this.data =  this.data.concat(data.data_detail.map((item) => Object. assign({}, item)));
      }
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async submitForm() {
    this.isSubmitted = true;
    //this.ionicForm.controls['tmpdata'].setValue(this.tmpdata);
    this.ionicForm.controls['type_sql'].setValue('insert');
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
          this.sub = this.mtdSv
            .crudmtd_user(this.ionicForm.value)
            .subscribe((data) => {
              if (data.status === 'ok') {
                //this.data.push(this.ionicForm.value);
               // console.log(this.data);
               this.data.push({
                 id : data.id,
                 emp_name :  this.ionicForm.controls['emp_name'].value,
                 group_name :  this.ionicForm.controls['group_id'].value.description,
               })
                loading.dismiss();
              } else {
                this.configSv.ChkformAlert(data.status);
                loading.dismiss();
              }

             
            });
        }
        loading.dismiss();
      });
  }

  selectData(id) {
    let item;
    item = this.data.filter(val => val.id == id);
    //console.log(item);
    item.forEach(item => {
      for (const [key, value] of Object.entries(item)) {
        //console.log(key , value)
        if (key === "group_id") {
          let a = this.ports.filter(function (item1) {
            return item1.id === value;
          })[0];
          this.portControl.setValue(a);
        }
        else{
          this.ionicForm.controls[key].setValue(value);
        }
       
      }
    });
  }

}

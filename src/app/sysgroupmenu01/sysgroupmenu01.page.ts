import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, } from "@angular/forms";
import { ConfigService } from "../sv/config.service";
import { Subscription } from "rxjs";
import { AlertController,LoadingController } from "@ionic/angular"; 
import { SysmenuService } from '../sv/sysmenu.service';

@Component({
  selector: 'app-sysgroupmenu01',
  templateUrl: './sysgroupmenu01.page.html',
  styleUrls: ['./sysgroupmenu01.page.scss'],
})
export class Sysgroupmenu01Page implements OnInit {
  ionicForm: FormGroup;isSubmitted = false;  portControl: FormControl;
  sub: Subscription;filterTerm: string;
  page = 0;maxpadding = 0;limit = 50;
  id: number;
  data = [];
  ports: any;
  group_name; group_id;
  constructor(public formBuilder: FormBuilder, public configSv: ConfigService, public sysmenuSv: SysmenuService, private alertCtrl: AlertController, private loadingController: LoadingController,private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParams.subscribe((res) => {
      let item = JSON.parse(res.value)
      this.group_id = item[0]['id'];
      this.group_name = item[0]['group_name'];

    });
  }

  ngOnInit() {
    this.portControl = this.formBuilder.control("", Validators.required);
    this.ionicForm = this.formBuilder.group({
      syssubmenu_id: this.portControl,
      title_menu: [""],
      highlight: [""],
      group_id:[this.group_id],
      type_sql: [null]
    });
    this.loaddata_submenu();
    this.loaddata();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  loaddata() {  
    this.ionicForm.controls['type_sql'].setValue('read');
    this.sub = this.sysmenuSv.getsyssubmenu_sysgroupmenu(this.ionicForm.value).subscribe((data) => {
      if (data !== null) {
        this.data = data.data_detail.map((item) => Object.assign({}, item));     
      
        // if (infiniteScroll) {
        //   infiniteScroll.target.complete();
        // }
      }
    });
  }

  loaddata_submenu() {  
    this.ionicForm.controls['type_sql'].setValue('readsubmenu');
    this.sub = this.sysmenuSv.getsyssubmenu_sysgroupmenu(this.ionicForm.value).subscribe((data) => { 
      if (data !== null) {
        this.ports = data.data_detail.map((item) => Object.assign({}, item));      
        //console.log(this.ports);
      }
    });
  }
  refreshForm() {
    this.ionicForm.reset({group_id:this.group_id});
    this.isSubmitted = false;
  }

  async submitForm() {
    this.isSubmitted = true;   
    this.ionicForm.controls['type_sql'].setValue('insert');
   
   //console.log(this.ionicForm.value,this.ionicForm.controls['id'].value);
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
          this.sub = this.sysmenuSv
            .crudsyssubmenu_sysgroupmenu(this.ionicForm.value)
            .subscribe((data) => {
              if(data.status === 'ok')
              {
                this.ionicForm.controls.syssubmenu_id.value.forEach((value,index) => {
                  this.data.unshift({
                    id: data.id[index],
                    title_show: value['title_show'],
                  }); 
                  this.ports = this.ports.filter(obj => obj.id !== value['id']);
                });
                this.refreshForm();
              }
 
            });
        }
        loading.dismiss();
      });
  }

  async deleteData(item){
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบเลขระบบที่ '+ item +' ? ',
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
            let vdata  = {
             'id' : item,
             'type_sql' : 'delete'
            }
          
            this.sub = this.sysmenuSv.crudsyssubmenu_sysgroupmenu(vdata).subscribe(
              (data) => {
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }              
              }, (error) => {
                console.log(JSON.stringify(error));
              }, () => {
                this.data = this.data.filter(obj => obj.id !== item);
                this.refreshForm();
              }
            );
        }
      }]
    });
    confirm.present();

  }

}

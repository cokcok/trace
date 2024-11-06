import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { ConfigService } from '../sv/config.service';
import { Subscription } from 'rxjs';
import { AlertController,LoadingController } from '@ionic/angular';
import { MtdService } from '../sv/mtd.service';
import { SysmenuService } from '../sv/sysmenu.service';
@Component({
  selector: 'app-sysyear',
  templateUrl: './sysyear.page.html',
  styleUrls: ['./sysyear.page.scss'],
})
export class SysyearPage implements OnInit {
  ionicForm: FormGroup; isSubmitted = false; 
  sub: Subscription; 

  constructor(public formBuilder: FormBuilder, public configSv: ConfigService, private alertCtrl: AlertController, private loadingController: LoadingController,public mtdSv: MtdService, public sysmenuSv: SysmenuService) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({     
      year : ["", [Validators.required,Validators.minLength(4), Validators.maxLength(4)]],
      //firstName: new FormControl('', [Validators.minLength(5), Validators.maxLength(10)]),
      empid: [this.configSv.emp_id],
      type_sql :[],

    });
    this.loaddata_year();
  }


  get errorControl() {
    return this.ionicForm.controls;
  }

  loaddata_year() {
    this.sub = this.sysmenuSv
      .getyear()
      .subscribe((data) => {
        if (data !== null) {
            this.ionicForm.controls["year"].setValue(data[0]['name']);
        }
      });
  }

  async submitForm() {
    this.isSubmitted = true;
    //this.ionicForm.controls['tmpdata'].setValue(this.tmpdata);
    this.ionicForm.controls['type_sql'].setValue('update');

    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!');
      return false;
    }
    else
    {

    await this.loadingController
      .create({
        message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่',
      })
      .then((loading) => {
        loading.present();
        this.sub = this.mtdSv
          .crudmtd_year(this.ionicForm.value)
          .subscribe((data) => {
            if (data.status === 'ok') {        
             this.configSv.ChkformAlert(data.message);
             // loading.dismiss();
            } else {
              this.configSv.ChkformAlert(data.message);
             // loading.dismiss();
            }
          
          });    
          loading.dismiss();
      });
    }
  }

}

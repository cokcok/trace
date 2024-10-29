import { Component, OnInit } from '@angular/core';
import { MenuController, NavController,LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment_ from 'moment';
import 'moment/locale/th';
import { ConfigService } from '../sv/config.service';
import { SigninService } from '../sv/signin.service';
import { SysmenuService } from '../sv/sysmenu.service';

const moment = moment_;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html', 
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup; sub: Subscription;
  isSubmitted = false; 
  versionNumber: string | number;
  constructor(public formBuilder: FormBuilder, public menuCtrl: MenuController,public configSv:ConfigService,private navCtrl: NavController ,private singsv:  SigninService, private loadingController: LoadingController,public sysmenuSv: SysmenuService) {
    this.menuCtrl.enable(false);
   }
 
  ngOnInit() {
    //this.portControl_checktype = this.formBuilder.control("", Validators.required);
    //this.portControl_dept = this.formBuilder.control("");
    this.menuCtrl.enable(false);
    this.ionicForm = this.formBuilder.group({
      year: [],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      //check_type: this.portControl_checktype,
      //dept: this.portControl_dept,
      //problem_cause: [''],
    });
    //setInterval(() => { this.GetDateTime() }, 1000);
    this.loaddata_year();
  }

  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    const aux: any = document.getElementsByTagName('META');
   
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].name === 'version') {
        this.versionNumber = aux[i].content;
      }
    }
    //this.loaddept();
  }
 
  // GetDateTime() {
  //   this.ionicForm.controls["server_time"].setValue(moment().format('DD/MM/YYYY H:mm:ss'));
  // }

  loaddata_year() {
    this.sub = this.sysmenuSv
      .getyear()
      .subscribe((data) => {
        if (data !== null) {
            //this.name = data[0]['name'];
            this.ionicForm.controls["year"].setValue(data[0]['name']);
            //this.configSv.year = data[0]['name'];
        }
      });
  }
 
  async submitForm() {
    //console.log('a');
    //this.configSv.loadingAlert(2000);
    //this.navCtrl.navigateForward('/main');
    this.isSubmitted = true;
    await this.loadingController
    .create({
      message: 'กำลังเข้าสู่ระบบ... กรุณารอสักครู่',
    })
    .then((loading) => {
      loading.present();
      if (!this.ionicForm.valid) {
        console.log('Please provide all the required values!');
        loading.dismiss();
        return false;
      } else {
        this.sub = this.singsv
          .signin(this.ionicForm.value)
          .subscribe((data) => {
            if (data !== null){ 
              this.singsv.publishSomeData(data); 
              this.ionicForm.reset();
              this.navCtrl.navigateForward('/main');
              loading.dismiss();
            }
           else
           {
            this.configSv.ChkformAlert('ไม่พบข้อมูล/รหัสผ่านไม่ถูกต้อง');
            loading.dismiss();
           }
            // if (data.status === 'ok') {
            //   this.navCtrl.navigateForward(['/trac102'], {
            //     queryParams: {
                
            //       trace1_id: data.id,
            //       merchantname: this.ionicForm.controls['merchantname'].value,
            //     }, //,skipLocationChange:true
            //   });
            //   loading.dismiss();
            // } else {
            //   this.configSv.ChkformAlert(data.status);
            //   loading.dismiss();
            // }

       
          });
      }
      //loading.dismiss();
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

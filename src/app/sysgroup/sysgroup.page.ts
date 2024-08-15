import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfigService } from '../sv/config.service';
import { Subscription } from 'rxjs';
import { AlertController,LoadingController } from '@ionic/angular';
import { SysmenuService } from '../sv/sysmenu.service';

@Component({
  selector: 'app-sysgroup',
  templateUrl: './sysgroup.page.html',
  styleUrls: ['./sysgroup.page.scss'],
})
export class SysgroupPage implements OnInit {
  ionicForm: FormGroup; isSubmitted = false;
  sub: Subscription; filterTerm: string;
  page = 0; maxpadding = 0; limit = 50;
  id: number;
  data = [];
  constructor(public formBuilder: FormBuilder, public configSv: ConfigService, public sysmenuSv: SysmenuService, private alertCtrl: AlertController, private loadingController: LoadingController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      id: [null],
      group_name: ["", [Validators.required]],
      description: [""],
      highlight: [""],
      type_sql: [null],
    });
    this.loaddata();
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  refreshForm() {
    this.ionicForm.reset();
    this.isSubmitted = false;
  }


  async submitForm() {
    this.isSubmitted = true;
   //console.log( this.ionicForm.controls['id'].value == null)
    if (this.ionicForm.controls['id'].value == null) {
      this.ionicForm.controls['type_sql'].setValue('insert');
    }
   else{
    this.ionicForm.controls['type_sql'].setValue('update');
   }
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
            .crudsysgroup(this.ionicForm.value)
            .subscribe((data) => {

              if (data.status === 'ok') {
                this.ionicForm.controls['id'].setValue(data.id);
                if(this.ionicForm.controls['type_sql'].value === 'insert')
                {
                  this.data.unshift(this.ionicForm.value);
                  this.refreshForm();
                }
                else
                {
                  this.data = this.data.filter(obj => obj.id !== data.id);
                  this.data.unshift(this.ionicForm.value);
                }
                
                this.configSv.ChkformAlert(data.message);
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

  loaddata() {
    let data = {
      'type_sql' : 'read',
    }
    this.sub = this.sysmenuSv.getsysgroup(data).subscribe(
      (data) => {
      console.log(data);
      this.data =  this.data.concat(data.data_detail.map((item) => Object. assign({}, item)));
        }      
    );
  }

  selectData(id) {
    let item;
    item = this.data.filter(val => val.id == id);
    //console.log(item);
    item.forEach(item => {
      for (const [key, value] of Object.entries(item)) {
        //console.log(key , value)
        this.ionicForm.controls[key].setValue(value);
      }
    });
  }

  async cancelData(item: any) {
    const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการลบข้อมูล',
      message: 'แน่ใจว่าต้องการลบเลขระบบที่ '+ item +' ? ',
      inputs: [
        {
          name: 'cause',
          placeholder: 'ระบุเหตุผลในการยกเลิก',
        },
      ],
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
           if(data['cause']){
            let vdata = {
              'type_sql' : 'cancel',
              'id' : item,
              'cause' : data['cause'],
            }
            console.log(vdata);
            this.sub = this.sysmenuSv.crudsysgroup(vdata).subscribe(
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
          else{
            this.configSv.ChkformAlert('กรุณาระบุเหตุผลในการลบด้วย');
          }
        }
      }]
    });
    confirm.present();
  }

}
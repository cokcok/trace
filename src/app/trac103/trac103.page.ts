import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams,LoadingController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ConfigService } from '../sv/config.service';

import { Trac1Service } from '../sv/trac1.service';
@Component({
  selector: 'app-trac103',
  templateUrl: './trac103.page.html',
  styleUrls: ['./trac103.page.scss'],
})
export class Trac103Page implements OnInit {
  sub: Subscription; item: any;ionicForm: FormGroup;;filterTerm: string;
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder,private modalCtrl:ModalController,public navParams : NavParams,public configSv:ConfigService ,private loadingController: LoadingController,private tracSv: Trac1Service) { 
    //console.log(this.navParams.get('data'));
    this.item = this.navParams.get('data');
    //console.log(this.item)
  }
  
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      trac1_land_assessment_id: [this.item['trac1_land_assessment_id']],
      //trac1_land_assessment_id: ['1807'],
      trace1_land_id: [this.item['id']],
      gid: [this.item['gid']],
      selected_land: [false],
      ld_type: [this.item['ld_type']],    
      ld_id: [this.item['ld_id']], 
      area_ha : [this.item['area_ha']],
      product_qty : [],
      product : [],
      forest63 : [this.item['forest63']],
      nrf :[this.item['nrf']],
      watershed : [this.item['watershed']],
      national_park : [this.item['national_park']],
      ac1 :['', [Validators.required]],
      ac2 :['', [Validators.required]],
      ac3 :['', [Validators.required]],
      ac4 :['', [Validators.required]],
      ac5 :['', [Validators.required]],
      ac6 :['', [Validators.required]],
      ac7 :['', [Validators.required]],
      ac8 :['', [Validators.required]],
      ac9 :['', [Validators.required]],
      ac10 :['', [Validators.required]],
      ac11 :['', [Validators.required]],
      risk : ['', [Validators.required] ],
      risktext : ['' ],
      consentform : [false, Validators.requiredTrue ],
      empid: [this.configSv.emp_id],
      dept_code : [this.configSv.dept_code],
      showtxt:[''],
      type_sql: [""],
      
    });
   // console.log(this.item['trac1_land_assessment_id']);
    if(this.item['trac1_land_assessment_id'] !== null){
      this.loadData();
    }
    //this.loadData()
    
  }

  dismissModal(){
    //this.modalCtrl.dismiss();
    this.modalCtrl.dismiss('','cancel');
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  radioGroupChange()
  {
    let risktotal = 11;
    let checkrisk0:number = 0;
    let checkrisk1:number = 0;
    let checkall: string | boolean = true;

    for( let index = 1; index <= risktotal; index++){
      if(this.ionicForm.controls['ac'+index].value == 0)
      {
        checkrisk0++;
      }
      else
      {
        checkrisk1++;
      }
      if (this.ionicForm.controls['ac'+index].value == '')
      {      
        checkall = false;
      }
    }
    
    if(checkall === true  && checkrisk0 > 0)
    
    {
      this.ionicForm.controls['risktext'].setValue('พบความเสี่ยง');
      this.ionicForm.controls['selected_land'].setValue(false);
      this.ionicForm.controls['selected_land'].disable();
      this.ionicForm.controls['risk'].setValue(0);
    }
    else if(checkall === true  && checkrisk1 === 11)
    {
      this.ionicForm.controls['risktext'].setValue('ไม่พบความเสี่ยง');
      this.ionicForm.controls['risk'].setValue(1);
      this.ionicForm.controls['selected_land'].enable();
    }

  }

 async submitForm(){
      this.isSubmitted = true;
     // console.log(this.ionicForm.value);
     if(this.item['trac1_land_assessment_id'] === null){
      this.ionicForm.controls['type_sql'].setValue('insert');
     }
     else{
      this.ionicForm.controls['type_sql'].setValue('update');
     }
     
      await this.loadingController.create({
        message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
      }).then((loading) => {
  
        loading.present();

        if (!this.ionicForm.valid) {
          console.log("Please provide all the required values!");
          loading.dismiss();
          return false;
          
        } else {
          
          this.sub = this.tracSv
          .crudtrac1_risk(this.ionicForm.value)
          .subscribe((data) => {
            if(data.status === 'ok')
            {
              loading.dismiss();             
              this.ionicForm.controls['trac1_land_assessment_id'].setValue(data.id);
              this.modalCtrl.dismiss(this.ionicForm.value, 'submit');
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
 
  loadData(){
    this.sub = this.tracSv
    .gettrac1_read_assessment('read',this.item['trac1_land_assessment_id'])
    .subscribe((data) => {
      if (data !== null) {
        console.log(data.data_detail);
        data.data_detail.forEach((item) => {
          for (const [key, value] of Object.entries(item)) {
              this.ionicForm.controls[key].setValue(value);
          }
        });
      }
    });
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe();
  // }
}

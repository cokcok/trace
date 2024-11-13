import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams,LoadingController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ConfigService } from '../sv/config.service';
import { Trac1Service } from '../sv/trac1.service';

@Component({
  selector: 'app-trac104',
  templateUrl: './trac104.page.html',
  styleUrls: ['./trac104.page.scss'],
})
export class Trac104Page implements OnInit {
  sub: Subscription; item: any;ionicForm: FormGroup;;filterTerm: string;
  isSubmitted = false;
  constructor(public formBuilder: FormBuilder,private modalCtrl:ModalController,public navParams : NavParams,public configSv:ConfigService ,private loadingController: LoadingController,private tracSv: Trac1Service) { 
    this.item = this.navParams.get('data');
    //console.log(this.item);
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      trac1_id : this.item['trac1_id'],
      running : this.item['running'],
      seller_idc : ['', [Validators.required]],
      seller_name : ['', [Validators.required]],
      trac1_seller_id : this.item['trac1_seller_id'],
      type_sql : this.item['type_sql'],
      empid: [this.configSv.emp_id],
      year : [this.configSv.year],

    });  
  }


  dismissModal(){
    this.modalCtrl.dismiss('','cancel');
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async submitForm(){
    this.isSubmitted = true;

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
            .trac1_reloadData(this.ionicForm.value)
            .subscribe((data) => {
                
                // this.data[indexsell]['appno'] = data.data_detail[0]['appno'];
                // this.data[indexsell]['detail_land'] =  this.data[indexsell]['detail_land'].concat(data.data_detail[0]['detail_land'].map((item) => Object. assign({}, item)));
               if(  this.ionicForm.controls["type_sql"].value === 'AddUser'  ) 
               {
                this.modalCtrl.dismiss(data, 'submit');
               }
               else if(this.ionicForm.controls["type_sql"].value === 'updateOwner')
               {
                this.modalCtrl.dismiss(data, 'update');
               }
                
               loading.dismiss();      
      });

        }
    });

  }
}

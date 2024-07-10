import { Component, OnInit } from '@angular/core';
import { MenuController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray  } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment_ from 'moment';
import 'moment/locale/th';
const moment = moment_;
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup; sub: Subscription;
  isSubmitted = false; vlat: any; vlon: any; vplf: any; vdevice: any;
  versionNumber: string | number;checktype:any;
  constructor(public formBuilder: FormBuilder, public menuCtrl: MenuController) { }

  ngOnInit() {
    //this.portControl_checktype = this.formBuilder.control("", Validators.required);
    //this.portControl_dept = this.formBuilder.control("");
    this.ionicForm = this.formBuilder.group({
      server_time: ["", [Validators.required]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      //check_type: this.portControl_checktype,
      //dept: this.portControl_dept,
      //problem_cause: [''],
    });
    setInterval(() => { this.GetDateTime() }, 1000);
  }

  
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    const aux: any = document.getElementsByTagName('META');
   
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].name === 'version') {
        //this.versionNumber = aux[i].content;
      }
    }
    //this.loaddept();
  }
 
  GetDateTime() {
    this.ionicForm.controls["server_time"].setValue(moment().format('DD/MM/YYYY H:mm:ss'));
  }
}

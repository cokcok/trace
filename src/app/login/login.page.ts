import { Component, OnInit } from '@angular/core';
import { MenuController, NavController,AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as moment_ from 'moment';
import 'moment/locale/th';
import { ConfigService } from '../sv/config.service';

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
  constructor(public formBuilder: FormBuilder, public menuCtrl: MenuController,public configSv:ConfigService,private navCtrl: NavController) {
    this.menuCtrl.enable(false);
   }

  ngOnInit() {
    //this.portControl_checktype = this.formBuilder.control("", Validators.required);
    //this.portControl_dept = this.formBuilder.control("");
    this.menuCtrl.enable(false);
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
        this.versionNumber = aux[i].content;
      }
    }
    //this.loaddept();
  }
 
  GetDateTime() {
    this.ionicForm.controls["server_time"].setValue(moment().format('DD/MM/YYYY H:mm:ss'));
  }

  submitForm() {
    //console.log('a');
    //this.configSv.loadingAlert(2000);
    this.navCtrl.navigateForward('/main');
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}

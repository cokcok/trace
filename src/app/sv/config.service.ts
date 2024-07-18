import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
import {employee} from '../models/signin_model';
import { AlertController, LoadingController,NavController } from '@ionic/angular';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public ip:string = "https://appcen01.raot.co.th/ws_ied/";
  
  public emp_id: string; public dept_code: number;
  public group_id: number; public pic: string;
  public prefix_name: string; public name: string; public surname: string; 


  idleState = 'Not started.';timedOut = false;lastPing?: Date = null;
  constructor(private http: HttpClient,private loadingController: LoadingController,private alertCtrl: AlertController,private idle: Idle, private keepalive: Keepalive,private navCtrl: NavController) { }



  async loadingAlert(dur:number) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กรุณารอสักครู่ กำลังโหลดข้อมูล...',
      duration: dur
    });
    return await loading.present();

   // return loading;
  }

  async ChkformAlert(text:string){
    const alert = await this.alertCtrl.create({
      message: text,
      buttons: ['ตกลง']
      });
      return await alert.present();
  }

  chkidle(){
    //console.log('aaa');
    this.idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    this.idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.';
      //this.ChkformAlert('session_timeout');
    });
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      this.resetidle();
      console.log(this.idleState);
      //this.navCtrl.navigateForward('/rwa01');
    });
    this.idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!';
      //this.ChkformAlert('session_timeout');
    });
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');
    // sets the ping interval to 15 seconds
    this.keepalive.interval(15);
    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());
    this.resetidle();
   }

  resetidle() {
    this.idle.watch();
    this.timedOut = false;

  }

  stopidle(){
    this.idle.timeout();
  }


}

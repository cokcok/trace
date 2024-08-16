import { Component } from '@angular/core';
import {RwaConfigService} from './sv/rwa-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  //public appPages: any;
  
   emp_name: string; dept_name: string; pic: string;
   versionNumber: string|number;

  // public appPages = [
  //   { title: 'ประชาสัมพันธ์', url: '/main', icon: 'mail' },
  //   //{ title: 'Trac1-นำเข้าข้อมูล', url: '/trac101', icon: 'mail' },
  //   { title: 'เพิ่มข้อมูล Trac1-2 ', url: '/trac105', icon: 'mail' },
  //   { title: ' เมนูหลัก ', url: '/sysmenu', icon: 'mail' },
  //   { title: ' เมนูหลักย่อย ', url: '/syssubmenu', icon: 'mail' },
  //   { title: ' กลุ่มผู้ใช้ ', url: '/sysgroup', icon: 'mail' },
  //   { title: ' เชื่อมโยงเมนูกับกลุ่มผู้ใช้ ', url: '/sysgroupmenu', icon: 'mail' },
  //   { title: ' กำหนดสิทธิ์ผู้ใช้ ', url: '/mtduser', icon: 'mail' },
  //   { title: 'ออกจากระบบ ', url: '/folder/Logout', icon: 'mail' },
  // ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public configSv: RwaConfigService) {
    //this.configSv.chkidle();
    
  }


  Showversion() {
    const aux: any = document.getElementsByTagName('META');
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < aux.length; i++) {
     if (aux[i].name === 'version') {
       this.versionNumber = aux[i].content;
      }
    }
  }
  
}

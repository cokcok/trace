import { Component } from '@angular/core';
import {RwaConfigService} from './sv/rwa-config.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  // public appPages = [
  //   { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
  //   { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
  //   { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
  //   { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
  //   { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
  //   { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  // ];
  public appPages = [
    { title: 'ประชาสัมพันธ์', url: '/main', icon: 'mail' },
    { title: 'Trac1-นำเข้าข้อมูล', url: '/trac101', icon: 'mail' },
    { title: 'ข้อมูล Trac1-2 ที่นำเข้า', url: '/trac105', icon: 'mail' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public configSv: RwaConfigService) {
    //this.configSv.chkidle();
    
  }
  
}

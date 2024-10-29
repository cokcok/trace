import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { SysmenuService } from '../sv/sysmenu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  name:any; sub: Subscription;
  constructor(public menuCtrl: MenuController, public sysmenuSv: SysmenuService) { 
   this.loaddata();
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    
  }

 
  loaddata() {
    this.sub = this.sysmenuSv
      .getpublicize()
      .subscribe((data) => {
        if (data !== null) {
            this.name = data[0]['name'];
        }
      });
  }
}

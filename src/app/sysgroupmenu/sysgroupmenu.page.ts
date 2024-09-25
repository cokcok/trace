import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../sv/config.service';
import { SysmenuService } from '../sv/sysmenu.service';
import { Subscription } from "rxjs";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sysgroupmenu',
  templateUrl: './sysgroupmenu.page.html',
  styleUrls: ['./sysgroupmenu.page.scss'],
})
export class SysgroupmenuPage implements OnInit {
  sub: Subscription;
  filterTerm: string;
  page = 0;
  maxpadding = 0;
  limit = 50; data = [];
  constructor(public configSv: ConfigService, public sysmenuSv: SysmenuService, private navCtrl: NavController, public router: Router) { }

  ngOnInit() {
    this.loaddata();
  }

  loaddata() {
    let data = {
      'type_sql' : 'read',
    }
    this.sub = this.sysmenuSv.getsysgroup(data).subscribe(
      (data) => {
      //console.log(data);
      this.data =  this.data.concat(data.data_detail.map((item) => Object. assign({}, item)));
        }      
    );
  }

  selectData(id) {

      this.navCtrl.navigateForward(['/sysgroupmenu01'],{
        queryParams: {
           value : JSON.stringify(this.data.filter(function (val) { return val.id == id;})),
          }, skipLocationChange: true,
        });

  }

}

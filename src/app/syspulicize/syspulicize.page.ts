import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../sv/config.service';
import { SysmenuService } from '../sv/sysmenu.service';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-syspulicize',
  templateUrl: './syspulicize.page.html',
  styleUrls: ['./syspulicize.page.scss'],
})
export class SyspulicizePage implements OnInit {
  publicize:any;sub: Subscription;
  constructor(public configSv: ConfigService, public sysmenuSv: SysmenuService) { 
    this.loaddata();
  }

  ngOnInit() {
  } 

  loaddata() {
    this.sub = this.sysmenuSv
      .getpublicize()
      .subscribe((data) => {
        if (data !== null) {
            this.publicize = data[0]['name'];
        }
      });
  }

  submitForm(value){

   let data = {
      'name':value,
      'emp_id': this.configSv.emp_id,
      'type_sql': 'update'
    }

    this.sub = this.sysmenuSv
    .crudpublicize(data)
    .subscribe(
      (data) => {
        this.configSv.ChkformAlert(data.message);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );

  }

  

}

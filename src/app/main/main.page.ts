import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Subscription } from "rxjs";

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(public menuCtrl: MenuController) { 
   
  }

  ngOnInit() {
    this.menuCtrl.enable(true);
    
  }

}

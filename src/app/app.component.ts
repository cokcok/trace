import { Component } from '@angular/core';
import { ConfigService } from './sv/config.service';
import { SigninService } from './sv/signin.service';
import { Platform, NavController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages: any;
   emp_name: string; dept_name: string; pic: string; year:number;
   public selectedIndex = 0; group_name:string;
   versionNumber: string|number;chkAuten = false;
   filterTerm: string;
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
  constructor( private platform: Platform,
    public configSv: ConfigService,private singsv:  SigninService,private router: Router,) {
    //this.configSv.chkidle();
    this.initializeApp();
    this.Showversion();
    //this.year = this.configSv.year;
    
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

  initializeApp() {
    this.platform.ready().then(() => {
    
    

      this.chklogin();  // เช็ด ต้องผ่านหน้า login ก่อน
     // this.configSv.chkidle(); // เช็ด ถ้าไม่มีการ active ที่หน้าจอ จะย้อนกลับไปหน้า login
      this.singsv.getObservable().subscribe((data) => {
        //console.log(data);
        // console.log('Data received', data);
        this.configSv.emp_id = data['employee'][0]['emp_code'];
        this.emp_name = data['employee'][0]['emp_name'];
        this.configSv.dept_code = data['employee'][0]['dept_code'];
        this.dept_name = data['employee'][0]['dept_name'];
        this.group_name = data['employee'][0]['group_name'];
        this.pic = data['employee'][0]['pic'];
        this.appPages = data['employee'][0]['page'];
        this.configSv.group_id = data['employee'][0]['sys_group_id'];
        this.configSv.year = data['employee'][0]['year'];
        this.year = data['employee'][0]['year'];
        // this.configSv.pic = data['employee'][0]['pic'];
        // this.configSv.prefix_name = data['employee'][0]['prefix_name'];
        // this.configSv.name = data['employee'][0]['name'];
        // this.configSv.surname = data['employee'][0]['surname'];
        // console.log(this.appPages)
      });


      // this.signinSv.getObservable1().subscribe((data) => {
      //   // console.log('Data received', data,data['picresizbase64List'][0]['url']);
      //   this.emp_name = data['prefix_name'] + ' ' + data['name'] + ' ' + data['surname'];
      //   if (data['picresizbase64List'].length > 0){
      //     this.pic = data['picresizbase64List'][0]['url'];
      //   }else{
      //     this.pic = null;
      //   }

      // });
    });
    // 
  }

  async ngOnInit() {

    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    // this.menuCtrl.close();
  }
  
  chklogin() {
    if (this.chkAuten === false) {

      this.router.navigateByUrl('/login');
    }
  } 

  chPass(){

  }
}

import { Component, OnInit } from '@angular/core';
import { MenuController, NavController,AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators,FormControl,FormArray  } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as XLSX from 'xlsx';
import { Trac1Service } from '../sv/trac1.service';
import { MtdService } from '../sv/mtd.service';
import { PlaceService } from '../sv/place.service';
import { ConfigService } from '../sv/config.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trac101',
  templateUrl: './trac101.page.html',
  styleUrls: ['./trac101.page.scss'],
})
export class Trac101Page implements OnInit {
  ionicForm: FormGroup; sub: Subscription;
  tmpdata = [];isSubmitted = false;
  constructor(public formBuilder: FormBuilder, private alertCtrl: AlertController, private tracSv: Trac1Service,public placeSv:PlaceService,public configSv:ConfigService,private navCtrl: NavController,private router: Router,private loadingController: LoadingController) { }
 //, public placeSv: PlaceSvService, private modalCtrl: ModalController
  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      merchantname: ['5', [Validators.required]],
      appno: ['5'],
      operatorname: ['5', [Validators.required]],
      operatorname_idcard: ['5', [Validators.required]],
      operatorname_tel : ['5', [Validators.required]],
      place_rubber : ['5', [Validators.required]],
      place_rubber1 : ['5', [Validators.required]],
      tmpdata: ["", [Validators.required]],
      empid: [this.configSv.emp_id],
      dept_code : [this.configSv.dept_code],
      type_sql: [""],
      
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }


  onInputClick(event) {
    event.target.value = '';
  }

  onFileChange(evt: any) {
    /* wire up file reader */
    var file = evt.srcElement.files[0];

    //console.log(file);
    if (typeof file !== 'undefined') {
      var HTMLOUT = document.getElementById('htmlout');
      var xlsxcount = document.getElementById('xlsxcount');
      const target: DataTransfer = <DataTransfer>(evt.target);
      if (target.files.length !== 1) throw new Error('Cannot use multiple files');
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        /* grab first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        this.tmpdata = XLSX.utils.sheet_to_json(ws, { header: 1 });
        //console.log(this.tmpdata,this.tmpdata.length);
        xlsxcount.innerHTML = "มีข้อมูลนำเข้า จำนวน " + (this.tmpdata.length-1) + " รายการ";
        HTMLOUT.innerHTML = "";
        wb.SheetNames.forEach(function (sheetName) {
          var htmlstr = XLSX.write(wb, { sheet: sheetName, type: 'string', bookType: 'html' });
          HTMLOUT.innerHTML += htmlstr;
        });

      };
      //reader.readAsBinaryString(target.files[0]);
      reader.readAsArrayBuffer(target.files[0]);
      //xlxscout.innerText = " มีข้อมูลนำเข้าจำนวน "  this.tmpdata.length-2 
     
      evt.value = ''; file.value = '';


    }
  }


    async  submitForm(){
      //this.isSubmitted = true;
      this.ionicForm.controls['tmpdata'].setValue(this.tmpdata);
       this.ionicForm.controls['type_sql'].setValue('insert');
      await this.loadingController.create({
        message: 'กำลังโหลดข้อมูล... กรุณารอสักครู่'
      }).then((loading) => {
  
        loading.present();

        // if (!this.ionicForm.valid) {
        //   console.log("Please provide all the required values!");
        //   loading.dismiss();
        //   return false;
          
        // } else {
          
          this.sub = this.tracSv
          .crudtrac1(this.ionicForm.value,'insert')
          .subscribe((data) => {
            if(data.status === 'ok')
            {
              loading.dismiss();
              //this.router.navigateByUrl('/trac102/'+ data.id + '/'+ this.ionicForm.value);
              // this.router.navigate(['/trac102/'+ data.id], {
              //   skipLocationChange: true,
              // });
              this.navCtrl.navigateForward(['/trac102'],{
                queryParams: {
                  //  value : JSON.stringify(this.data.filter(function (val) { return val.id == id;})),
                  //  xxx :'aaa',
                  trace1_id : data.id,
                  merchantname: this.ionicForm.controls['merchantname'].value
                  } //,skipLocationChange:true
                });
        

            }
            else
            {
              this.configSv.ChkformAlert(data.status);
              loading.dismiss();
            }
         
            // this.navCtrl.navigateForward(['/trac102', {
            //   trace1_id: data.id,
             
            //   }]);
           });
        //} 
        //loading.dismiss();
      });
      
    }

    
   

}



  // async submitForm(){
    //   this.isSubmitted = true;
    // //console.log(this.tmpdata);
    // this.ionicForm.controls['tmpdata'].setValue(this.tmpdata);
    // this.ionicForm.controls['type_sql'].setValue('insert');
    // //this.ionicForm.controls['empid'].setValue(this.configSv.emp_id);


    // console.log(this.ionicForm.value);
    
    // // this.sub = this.tracSv
    // //   .crudtrac1(this.ionicForm.value, 'insert')
    // //   .subscribe(async  (data_check) => {
      
    // //   } ,
    // //   (error) => {
    // //     console.log(JSON.stringify(error));
    // //   },
    // //   () => {});


    //   //this.isSubmitted = true;
    //   if (!this.ionicForm.valid) {
    //     console.log("Please provide all the required values!");
    //     return false;
    //   } else {
    //    // this.configSv.loadingAlert(3000);
    //     this.sub = this.tracSv
    //     .crudtrac1(this.ionicForm.value,'insert')
    //     .subscribe((data) => {
    //       if(data.status === 'ok')
    //       {
    //         this.router.navigateByUrl('/trac102/'+ data.id);
    //       }
    //       else
    //       {
    //         this.configSv.ChkformAlert(data.status);
    //       }
       
    //       // this.navCtrl.navigateForward(['/trac102', {
    //       //   trace1_id: data.id,
           
    //       //   }]);
    //      });
    //   }  

    // }

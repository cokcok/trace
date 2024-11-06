import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Subscription } from "rxjs";
import { ConfigService } from '../sv/config.service';
import { SigninService } from '../sv/signin.service';

@Component({
  selector: 'app-chpass',
  templateUrl: './chpass.page.html',
  styleUrls: ['./chpass.page.scss'],
})
export class ChpassPage implements OnInit {
  ionicForm1: FormGroup; isSubmitted1 = false; sub: Subscription;
  constructor(public formBuilder: FormBuilder,
    public configSv: ConfigService,
    public signinSv: SigninService,) { }

  ngOnInit() {

    this.ionicForm1 = this.formBuilder.group({
      id: [this.configSv.emp_id],
      oldpass: ["", [Validators.required]],
      newpass: ["", [Validators.required]],
      comfirm_newpass: ["", [Validators.required]],
      type_sql:[""],
      empid:[this.configSv.emp_id],

    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('newpass').value;
    const confirmPass = group.get('comfirm_newpass').value;
  
    return pass === confirmPass ? null : { notSame: true };
  }


  get errorControl1() {
    return this.ionicForm1.controls;
  }

  ngOnDestroy(): void {
    if(this.sub){
      this.sub.unsubscribe();
    }
  }

  chPass(){
    this.isSubmitted1 = true;
    //console.log(this.ionicForm1.value);
    if (!this.ionicForm1.valid) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      this.ionicForm1.controls['type_sql'].setValue('chpass');
      this.sub = this.signinSv
      .crudchpass(this.ionicForm1.value)
      .subscribe(
        (data) => {
          console.log(data.status);
            if (data.status === "ok"){
              this.reset();
              this.configSv.ChkformAlert(data.message);             
            }
            else{
              this.configSv.ChkformAlert(data.message);
            }
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }

  reset(){
    this.ionicForm1.reset({empid: this.configSv.emp_id,id:this.configSv.emp_id});
    this.isSubmitted1 = false;
  }

}

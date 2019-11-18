import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Loginuser } from '../loginuser';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { element } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  isSubmitted = false;
  loginuser: Loginuser = new Loginuser();
  message: string;
  constructor(private authservice: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]]
    });
  }
  get formControls() { return this.loginform.controls; }
  login() {
    console.log(this.loginform.value);
    this.isSubmitted = true;
    if (this.loginform.invalid) {
      return;
    }
    this.authservice.login(this.loginform.value).subscribe(x => {
      x.forEach(element => {
        this.loginuser.rid = element["r_id"];
        console.log(this.loginuser.rid);
        if (this.loginuser.rid == 1) {
          this.router.navigate(['product-add'])
        }
//else if(this.loginuser.rid==2)
//{
  //this.message="";//
 // this.router.navigate//
//}//
      })
    });

  }
}

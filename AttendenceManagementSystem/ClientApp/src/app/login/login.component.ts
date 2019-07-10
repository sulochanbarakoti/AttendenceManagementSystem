import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { navHide } from '../Service/nav.Service';
import { UserInfoService } from '../Service/UserInfo.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userForm:FormGroup;
  constructor(
    private _user:UserInfoService,
    private _nav:navHide,
  ) { 

    this.userForm=new FormGroup({
      Username: new FormControl(''),
      Password: new FormControl('')
    })
    this._nav.hide();

  }

  ngOnInit() {
  }
  onFormSubmit(){
    this._user.loginAuthentication(this.userForm.getRawValue());
  }
}

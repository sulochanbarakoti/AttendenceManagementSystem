import { Component, OnInit } from '@angular/core';
import { navHide } from '../Service/nav.Service';
import { FormGroup, FormControl } from '@angular/forms';
import { registerForm } from '../Service/register.service';
import { HttpClient } from '@angular/common/http';
import { roles } from '../Model/Role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userRole: roles;
  constructor(
    private _nav: navHide,
    private _register: registerForm,
    private _http: HttpClient
  ) {
    this._nav.show();
    this.registerForm = new FormGroup({
      Email: new FormControl(''),
      Username: new FormControl(''),
      Name: new FormControl(''),
      Password: new FormControl(''),
      Address: new FormControl(''),
      // Gender: new FormControl(),
      PhoneNumber: new FormControl(''),
      RoleId: new FormControl('')
    })

    // this.registerForm.controls['Gender'].valueChanges.subscribe((state: any) => {
    //   // console.log(state);
    // }

    this.getRole();
  }

  ngOnInit() {
  }
  onFormSubmit() {
    this._register.userRegister(this.registerForm.getRawValue());
  }

  getRole() {
    this._http.get<roles>('api/UserRole').subscribe(data => {
      this.userRole = data;
    })
  }

}

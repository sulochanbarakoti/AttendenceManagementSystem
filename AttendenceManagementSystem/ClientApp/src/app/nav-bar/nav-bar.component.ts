import { Component, OnInit } from '@angular/core';
import { navHide } from '../Service/nav.Service';
import { userAccess } from '../Service/isValid.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  valid: Boolean
  constructor(
    private _isValid: userAccess,
    private _route: Router,
  ) {
    this._isValid.hide();
    this._isValid.checkValid(val => {
      if (val) {
        this.valid=true;
        this._isValid.show();
      }
      this.valid=false;
    })
  }

  ngOnInit() {
  }
  logOut() {
    localStorage.clear();
    this._route.navigate[('/')];
  }
}

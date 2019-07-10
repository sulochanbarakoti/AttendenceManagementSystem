import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../Model/UserInfoModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { navHide } from '../Service/nav.Service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userInfo: UserInfo
  constructor(
    private _http: HttpClient,
    private _nav: navHide,

  ) {

    this.getUserList();
  }

  ngOnInit() {
  }
  getUserList() {
    let token = localStorage.getItem("jwt");
    this._http.get<UserInfo>("api/UserInfo", {
      headers: new HttpHeaders({
        "Authorization": "Bearer" + token,
        "Content-Type": "application/json"
      })
    }).subscribe(res => {
      this.userInfo = res;
      this._nav.show();
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

}

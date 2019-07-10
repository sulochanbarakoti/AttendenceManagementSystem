import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserInfo } from "../Model/UserInfoModel";

@Injectable()
export class registerForm {

    constructor(
        private _http: HttpClient
    ) {

    }
    userRegister(data) {
        debugger;
        let token = localStorage.getItem("jwt");
        this._http.post<UserInfo>('api/RegisterUser', data, {
            headers: new HttpHeaders({
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            })
        }).subscribe(res => {
            console.log(res);
        }, err => {
            console.log(err);
        })
    }

}
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { PunchIn } from "../Model/PunchIn";
import { PunchOut } from "../Model/PunchOut";

@Injectable()
export class UserInfoService {
    constructor(
        private _http: HttpClient,
        private _route: Router
    ) {

    }
    loginAuthentication(data) {
        let credentials = JSON.stringify(data);
        this._http.post('api/Auth', data, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).subscribe(res => {
            let token = (<any>res).token;
            localStorage.setItem("jwt", token);
            // this.invalidLogin = false;
            this._route.navigate(["home"]);
        }, err => {
            // this.invalidLogin = true;
            console.log(err);
        });
        localStorage.setItem("username", data.Username);
    }
    getDataPunchIn(username:string){
        return this._http.get<PunchIn>('api/PunchIn/getData/'+ username);
    }
    getDataPunchOut(username:string){
        return this._http.get<PunchOut>('api/PunchOut/getData/'+ username);
    }
}
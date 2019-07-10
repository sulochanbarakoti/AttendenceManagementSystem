import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelper } from 'angular2-jwt';
import { userAccess } from "../Service/isValid.service";


@Injectable()
export class pageGuard implements CanActivate {
    /**
     *
     */
    test:boolean
    constructor(private _jwtHelper: JwtHelper, private _route: Router, private _isValid: userAccess) {


    }
    canActivate() {
        var token = localStorage.getItem("jwt");
        if(token && !this._jwtHelper.isTokenExpired(token)){
            this._isValid.checkValid(val =>{
                if(val){
                    return true;
                }
            })
            return true;
        }
        this._route.navigate[('/home')]
        return false;
    }
}
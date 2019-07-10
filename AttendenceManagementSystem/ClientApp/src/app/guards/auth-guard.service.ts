import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelper } from 'angular2-jwt';


@Injectable()
export class authSecurity implements CanActivate{
    /**
     *
     */
    constructor(private _jwtHelper:JwtHelper,private _route:Router) {
        
    }
    canActivate(){
        var token = localStorage.getItem("jwt");
        if(token && !this._jwtHelper.isTokenExpired(token)){
            return true;
        }
        this._route.navigate(["/"]);
        return false;
    }

}
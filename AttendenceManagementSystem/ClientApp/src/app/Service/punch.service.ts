import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { PunchIn } from "../Model/PunchIn";
import { PunchOut } from "../Model/PunchOut";

@Injectable()
export class punch {
    punchInData: PunchIn;
    constructor(
        private _http: HttpClient,
    ) {

    }

    // save PunchIn data
    savePunchIn(data) {
        let token = localStorage.getItem("jwt");
        this._http.post<PunchIn>('http://localhost:52586/api/PunchIn', data, {
            headers: new HttpHeaders({
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            })
        }).subscribe(response => {
            if (response) {
                alert("Entry Data Saved");
            }
            else {
                alert("Duplicate Data!!!");
            }
        }, err => {
            console.log(err)
        });
    }


    // save PunchOut data
    savePunchOut(data) {
        let token = localStorage.getItem("jwt");
        this._http.post<PunchOut>('http://localhost:52586/api/PunchOut', data, {
            headers: new HttpHeaders({
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            })
        }).subscribe(response => {
            if (response) {
                alert("Entry Data Saved");
            }
            else {
                alert("Duplicate Data!!!");
            }
        }, err => {
            console.log(err)
        });
    }

}

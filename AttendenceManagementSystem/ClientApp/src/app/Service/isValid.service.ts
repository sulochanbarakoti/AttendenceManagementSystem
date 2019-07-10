import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

@Injectable()
export class userAccess {
  isValid: boolean;
  valid: boolean;
  data: object;
  constructor(
    private _http: HttpClient,
  ) {
    this.isValid = false;
  }
  checkValid(callback) {
    this.data = {
      name: localStorage.getItem('username')
    }
    if (this.valid === undefined) {
      this._http.post('api/IsValid', this.data).subscribe(res => {
        console.log(res);
        callback(res);
      })
    } else {
      callback(this.valid);
    }
  }
  hide() {
    this.isValid = false;
  }
  show() {
    this.isValid = true;
  }
}
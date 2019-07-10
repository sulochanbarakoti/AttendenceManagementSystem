import { Component } from '@angular/core';
import { navHide } from '../Service/nav.Service';
import { GeoLocationService } from '../Service/geo-location.service';
import { PunchIn } from '../Model/PunchIn';
import { PunchOut } from '../Model/PunchOut';
import { punch } from '../Service/punch.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserInfoService } from '../Service/UserInfo.Service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  punchInDatas: PunchIn;
  punchOutDatas: PunchOut;
  Date: number = Date.now();
  User: string;
  PunchInDetails: PunchIn;
  PunchOutDetails: PunchOut;
  Message: string
  coordinates;
  time: number;

  constructor(
    private _nav: navHide,
    // private _geoLocation: GeoLocationService,
    private _punchIn: punch,
    private _http: HttpClient,
    private _user:UserInfoService
  ) {
    this.punchInData();
    this.punchOutData();
    this.User = localStorage.getItem('username');
    this.geoLocation();
  
  }
  ngOnInit() {
    this._nav.show();
  }

  // punch in data assign to parameter in function savePunchIn
  punchIn(data: any) {
    this.Message = data;
    this.geoLocation();
    this.PunchInDetails = {
      Date: new Date().toJSON().slice(0, 10),
      Time: new Date().toTimeString().slice(0, 10),
      Username: this.User,
      Message: data,
      Latitude: this.coordinates.latitude.toString(),
      Longitude: this.coordinates.longitude.toString(),
    }
    // passing parameter in function to service
    this._punchIn.savePunchIn(this.PunchInDetails);
  }



  // Punch Out data assign in parameter
  punchOut(data: any) {
    this.Message = data;
    this.geoLocation();
    this.PunchOutDetails = {
      Date: new Date().toJSON().slice(0, 10),
      Time: new Date().toTimeString().slice(0, 10),
      Username: this.User,
      Message: data,
      Latitude: this.coordinates.latitude.toString(),
      Longitude: this.coordinates.longitude.toString(),
    }
    // passing parameter in function to service
    this._punchIn.savePunchOut(this.PunchInDetails);
  }


  // Getting Geo-location function
  geoLocation() {
    if(navigator){
      navigator.geolocation.getCurrentPosition( pos => {
        this.coordinates = {
          latitude: +(pos.coords.latitude),
          longitude: +(pos.coords.longitude)
        };
      })
    }
    // this._geoLocation.getPosition().subscribe(
    //   (pos: Position) => {
    //     this.coordinates = {
    //       latitude: +(pos.coords.latitude),
    //       longitude: +(pos.coords.longitude)
    //     };
    //   });
  }


  // Listing PunchIn Data in Table
  punchInData() {
    this._user.getDataPunchIn(localStorage.getItem('username')).subscribe(res=>{
      this.punchInDatas = res;
      console.log(res);
    })
  }



  // Listing punchOut Data in table
  punchOutData() {
    this._user.getDataPunchOut(localStorage.getItem('username')).subscribe(res=>{
      this.punchOutDatas = res;
    })
  }
}

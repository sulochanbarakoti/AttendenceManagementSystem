import { Component, OnInit } from '@angular/core';
import { navHide } from '../Service/nav.Service';
import { UserInfo } from '../Model/UserInfoModel';
import { PunchIn } from '../Model/PunchIn';
import { PunchOut } from '../Model/PunchOut';
import { HttpClient } from '@angular/common/http';
import { UserInfoService } from '../Service/UserInfo.Service';
import { ExcelService } from '../Service/excel.service';
// import { punch } from '../Service/punch.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  username: UserInfo;
  InData: any;
  OutData: any;
  selectedLevel;
  user;
  constructor(
    private _nav: navHide,
    private _http: HttpClient,
    private _user: UserInfoService,
    private _excelService: ExcelService
  ) {
    this._nav.show();
    this.getUsername();

  }

  ngOnInit() {
    this.selected();
  }

  exportAsXLSX(): void {
    this._excelService.exportAsExcelFile(this.InData, 'sample');
  }
  exportAsXLSX2(): void {
    this._excelService.exportAsExcelFile(this.OutData, 'sample');
  }


  selected() {
    this.user = this.selectedLevel;
    this.punchInData();
    this.punchOutData();
  }
  getUsername() {
    this._http.get<UserInfo>('api/UserInfo').subscribe(data => {
      this.username = data;
    })
  }
  // Listing PunchIn Data in Table
  punchInData() {
    this._user.getDataPunchIn(this.user).subscribe(res => {
      this.InData = res;
      console.log(res);
    })
  }



  // Listing punchOut Data in table
  punchOutData() {
    this._user.getDataPunchOut(this.user).subscribe(res => {
      this.OutData = res;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { navHide } from '../Service/nav.Service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  constructor(
    private _nav:navHide
  ) {
    this._nav.show();

   }

  ngOnInit() {
  }

}

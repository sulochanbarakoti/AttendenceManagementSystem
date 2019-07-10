import { Component } from '@angular/core';
import { navHide } from './Service/nav.Service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(
    private _nav: navHide
  ) {
    this._nav.hide();
  }
}

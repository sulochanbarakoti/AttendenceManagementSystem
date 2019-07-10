import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserInfoService } from './Service/UserInfo.Service';
import { navHide } from './Service/nav.Service';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
import { authSecurity } from './guards/auth-guard.service';
import { JwtHelper } from 'angular2-jwt';
import { GeoLocationService } from './Service/geo-location.service';
import { AgmCoreModule } from '@agm/core';
import { punch } from './Service/punch.service';
import { RegisterComponent } from './register/register.component';
import { LeaveComponent } from './leave/leave.component';
import { UserComponent } from './user/user.component';
import { registerForm } from './Service/register.service';
import { userAccess } from './Service/isValid.service';
import { pageGuard } from './guards/page.guard.service';
import { ReportComponent } from './report/report.component';
import { ExcelService } from './Service/excel.service';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    LeaveComponent,
    UserComponent,
    LoginComponent,
    NavBarComponent,
    NavFooterComponent,
    ReportComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAFO2f8jftqgNYsGQFdcMXmmf6PSmofv6Q'
    }),
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent,pathMatch: 'full', canActivate: [authSecurity]  },
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent,canActivate: [pageGuard] },
      { path: 'leave', component: LeaveComponent,canActivate: [authSecurity] },
      { path: 'user', component: UserComponent,canActivate: [pageGuard] },
      { path: 'report', component: ReportComponent,canActivate: [pageGuard] },

    ])
  ],
  providers: [UserInfoService,FormBuilder,navHide,HttpClient,pageGuard, authSecurity,JwtHelper,GeoLocationService,punch,registerForm,
  userAccess,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }

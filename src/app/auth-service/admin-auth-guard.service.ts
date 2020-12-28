import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  isAdmin: boolean = false;
  constructor(private authervice: AuthenticationService) { }

  canActivate() {
    if(this.authervice.isUserLoggedIn) {
     let userName = this.authervice.getUserName();
     this.authervice.getAppUser(userName).map(appUser  => {
       // if role = 1 then its ADMIN User
      if(appUser.role === '1') {
        return this.isAdmin = true;
      } 
     }).subscribe(admin=> this.isAdmin = admin);
    }
    return this.isAdmin;
  }
}

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AppUser } from '../common/app-user';
import { AppSignUpForm } from '../common/app-sign-form';



@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  user: string;
  constructor(private httpClient: HttpClient) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
  authenticate(username, password) {
    // return this.httpClient
    //   .post<any>("http://localhost:8090/api/authenticate", { username, password });

    return this.httpClient
      .post<any>("http://localhost:8090/api/authenticate", { username, password });
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    console.log(!(user === null));
    return !(user === null);
  }

  getUserName() {
    let user = sessionStorage.getItem("username");
    if(!(user === null)) return user

    return "";
  }

  getAppUser(name: string) {
    return this.httpClient.get<AppUser>("http://localhost:8090/api/getUserData/" +  name);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }

  saveForm( signUpFrm : AppSignUpForm) {
   return this.httpClient.post<AppSignUpForm>("http://localhost:8090/api/saveSignUpForm" ,signUpFrm, { headers: {'content-type': 'application/json; charset=UTF-8'} });
  }
}

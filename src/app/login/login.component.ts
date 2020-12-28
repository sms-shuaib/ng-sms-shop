import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth/';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth-service/authentication.service';
import { DataService } from '../common/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  noUser;

  constructor(private afAuth: AngularFireAuth, private router: Router,
    private authService: AuthenticationService, private dataService: DataService) {
    if (this.authService.isUserLoggedIn()) this.router.navigate(["/"]);
  }


  // login(){
  //   this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  // } 


  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passWord: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  })

  get userNameValue() {
    return this.loginForm.controls['userName'];
  }

  get passWordValue() {
    return this.loginForm.controls['passWord'];
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.authenticate(this.userNameValue.value, this.passWordValue.value).subscribe(data => {
      console.log(data);
      sessionStorage.setItem("username", this.userNameValue.value);
      let tokenStr = "Bearer " + data.token;
      sessionStorage.setItem("token", tokenStr);
      this.checkUserLogin();
    }, (error: Response) => {
      if (error.status === 500) {
        this.noUser = "Invlaid Credentials";
      }
    });

  }
  onSignUp() {
    this.router.navigate(['/sign-up']);
  }

  checkUserLogin() {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/products']);
      this.dataService.setUserName(this.userNameValue.value);
    }
  }


}

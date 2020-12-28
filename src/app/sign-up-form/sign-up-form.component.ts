import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../auth-service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css']
})
export class SignUpFormComponent implements OnInit {

  signupForm= new FormGroup({
    userName: new FormControl('', [Validators.required,Validators.minLength(2)]),
    passWord: new FormControl('',[Validators.required,Validators.minLength(2)]),
    confirmPass: new FormControl('',[Validators.required,Validators.minLength(2)]),
    email: new  FormControl('',[Validators.required,Validators.minLength(2)])
  })

  invalidCredential:boolean;
  constructor(private authService: AuthenticationService,private route: Router) { }

  ngOnInit(): void {
  }
  get username(){
    return this.signupForm.controls['userName'];
    
  }

  get password(){
    return this.signupForm.controls['passWord']
  }

  get confirmPass(){
    return this.signupForm.controls['confirmPass']
  }

  get email(){
    return this.signupForm.controls['email'];
  }
onSave(){
  //console.log(this.signupForm.value);
  this.authService.saveForm(this.signupForm.value).subscribe(signupData=>{
    this.route.navigate(['/login']);
  });
}
  // onSubmitForm(){
  //   console.log("on submitting");
  // }

  checkValue(){
    this.invalidCredential = false;
    if(this.password.value !== this.confirmPass.value){
    this.invalidCredential = true;
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidParent = !!(
      control
      && control.parent
      && control.parent.invalid
      && control.parent.dirty
      && control.parent.hasError('notSame'));
    return (invalidParent);
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  errorMessage:string;
  loading:boolean = false;

  constructor(private authService: AuthorizationService,
              private router: Router,
              private formBuilder: FormBuilder) {
              this.registerForm = this.formBuilder.group({
                name: ['', [Validators.required, Validators.maxLength(255)]],
                login: ['', [Validators.required, Validators.maxLength(255)]],
                password: ['', [Validators.required, Validators.maxLength(255)]],
                confirmPassword: ['']
              },
                { validator: this.checkPasswords });
  }

  ngOnInit(): void { }

  registerUser() {
    if(!this.registerForm.invalid){
      this.loading = true;
      this.authService.registerUser({
        ...this.registerForm.value
      }).subscribe(() => {
        this.router.navigate(['cabinet']);
        this.loading = false;
      }, err => {
        this.errorMessage = err.error;
          this.loading = false;
      })
    }
  }



  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }
}

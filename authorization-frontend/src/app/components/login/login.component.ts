import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  errorMessage:string;
  loading:boolean = false;

  constructor(private authService: AuthorizationService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: this.login,
      password: this.password
    });

  }

  loginCabinet() {
    if(!this.loginForm.invalid){
      this.loading = true;
      this.authService.login({
        ...this.loginForm.value
      }).subscribe(() => {
            this.router.navigate(['cabinet']);
            this.loading = false;
        }, err => {
          this.errorMessage = err.error;
            this.loading = false;
        })
      
    }
  }
}

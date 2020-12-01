import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '../services/authorization.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private as: AuthorizationService, 
              private router: Router) {}

  canActivate():boolean {
    
    if(!this.as.isAuthenticated()){
      this.router.navigate(['']);
    }
      return true;
  }  
}

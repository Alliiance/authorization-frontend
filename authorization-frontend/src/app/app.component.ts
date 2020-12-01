import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  constructor(private authService:AuthorizationService,
              private router: Router ){}

  ngOnInit(): void {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
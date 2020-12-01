import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token } from '../models/token';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { AUTH_API_URL } from '../app-injection-tokens';
import { JwtHelperService } from '@auth0/angular-jwt';

export const ACCESS_TOKEN_KEY = 'login_access_token'

@Injectable({
  providedIn: 'root'
})

export class AuthorizationService {

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService,
              @Inject(AUTH_API_URL) private apiUrl:string,) { }

  login(login: User): Observable<Token> {
    return this.http.post<Token>(this.apiUrl + "login", login)
      .pipe(
      tap(token => {
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      })
    )
  }

  registerUser(user: User): Observable<Token> {
    return this.http.post<Token>(this.apiUrl + "registration", user)
      .pipe(
        tap(token => {
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        })
      )
  }

  getAllUser(): Observable<User[]>  {
    const authorization ='Bearer ' + localStorage.getItem(ACCESS_TOKEN_KEY);
    return this.http.get<User[]>(this.apiUrl + "getUsers",{
      headers: new HttpHeaders({
        authorization
      })  
    });
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    var token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token && !this.jwtHelper.isTokenExpired(token);;
  }
}

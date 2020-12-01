import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http'

import { MatCardModule} from '@angular/material/card'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule} from '@angular/material/button'
import { MatTableModule} from '@angular/material/table'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { HomeComponent } from './components/home/home.component';
import { CabinetComponent } from './components/cabinet/cabinet.component';

import { JwtModule } from "@auth0/angular-jwt";
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AUTH_API_URL } from './app-injection-tokens';
import { environment } from 'src/environments/environment';
import { ACCESS_TOKEN_KEY } from './services/authorization.service';

export function tokenGetter() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CabinetComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatProgressBarModule,

    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['http://localhost:64544/'],
        disallowedRoutes: []
      }
    })
  ],

  providers: [{
    provide: AUTH_API_URL, 
    useValue: environment.authApi
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

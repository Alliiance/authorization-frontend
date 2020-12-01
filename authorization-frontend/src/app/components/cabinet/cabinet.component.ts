import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})

export class CabinetComponent implements OnInit {

  users: User[] = [];
  displayedColumns: string[] = [ 'name', 'login'];

  constructor(private authService: AuthorizationService) { }

  ngOnInit() {
    this.fetchUsers()
  }

  fetchUsers() {
    this.authService.getAllUser()
      .subscribe(user => {
        this.users = user
      })
  }

}

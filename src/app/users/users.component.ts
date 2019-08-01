import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserView, usersToUserViews } from './user-view.model';
import { forkJoin } from 'rxjs';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserView[];
  error: any;

  constructor(private usersService: UsersService, private rolesService: RolesService) { }

  ngOnInit() {
    this.showUsersWithRoles();
  }

  showUsersWithRoles() {

    const observableUsers = this.usersService.getUsers();
    const observableRoles = this.rolesService.getRoles();
    forkJoin([observableUsers, observableRoles]).subscribe(
      (([users, roles]) => this.users = usersToUserViews(users, roles)),
      err => this.error = err
    );

  }
}

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserView, usersToUserViews } from './user-view.model';
import { combineLatest, Observable, BehaviorSubject, Subject } from 'rxjs';
import { RolesService } from '../roles.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: BehaviorSubject<UserView[]> = new BehaviorSubject<UserView[]>([]);
  error: any;

  constructor(private usersService: UsersService, private rolesService: RolesService) { }

  ngOnInit() {
    this.showUsersWithRoles();
  }

  onChange(e: any, userId: number) {
    this.usersService.updateUser(userId, u => ({ ...u, name: e.target.value }));
  }

  showUsersWithRoles() {

    const observableUsers = this.usersService.getUsers();
    const observableRoles = this.rolesService.getRoles();
    combineLatest(observableUsers, observableRoles).subscribe(
      (([users, roles]) => this.users.next(usersToUserViews(users, roles))),
      err => this.error = err
    );

  }
}

import { Component, OnInit } from '@angular/core';
import { RoleView, rolesToRoleViews } from './role-view.model';
import { RolesService } from '../roles.service';
import { UsersService } from '../users.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: RoleView[]
  error: any;

  constructor(private rolesService: RolesService, private usersService: UsersService) { }

  ngOnInit() {
    this.showRolesWithUsers();
  }

  showRolesWithUsers() {
    const observableUsers = this.usersService.getUsers();
    const observableRoles = this.rolesService.getRoles();
    forkJoin([observableUsers, observableRoles]).subscribe(
      (([users, roles]) => this.roles = rolesToRoleViews(roles, users)),
      err => this.error = err
    );
  }
}

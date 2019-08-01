import { Component, OnInit } from '@angular/core';
import { RoleView, rolesToRoleViews } from './role-view.model';
import { RolesService } from '../roles.service';
import { UsersService } from '../users.service';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  roles: BehaviorSubject<RoleView[]> = new BehaviorSubject<RoleView[]>([]);
  error: any;

  constructor(private rolesService: RolesService, private usersService: UsersService) { }

  ngOnInit() {
    this.showRolesWithUsers();
  }

  onChange(e: any, roleId: number) {
    this.rolesService.updateRole(roleId, r => ({ ...r, name: e.target.value }));
  }

  showRolesWithUsers() {
    const observableUsers = this.usersService.getUsers();
    const observableRoles = this.rolesService.getRoles();
    combineLatest(observableUsers, observableRoles).subscribe(
      (([users, roles]) => this.roles.next(rolesToRoleViews(roles, users))),
      err => this.error = err
    );
  }
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './app-config.module';
import { catchError, retry, tap } from 'rxjs/operators';
import { buildHttpErrorHandler } from './error-handling.module';
import { Subject, BehaviorSubject } from 'rxjs';

const handleHttpError = buildHttpErrorHandler("An error occurred fetching roles");

export interface Role {
  id: number;
  name: string;
  colour: string;
  users: number[];
}

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private roles: BehaviorSubject<Role[]>;
  private dataCache: Role[];

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  getRoles() {
    const endpoint = this.config.rolesEndpoint;
    if (!this.roles) {
      this.roles = new BehaviorSubject([]);
      this.http.get<Role[]>(endpoint).pipe(
        retry(3),
        catchError(handleHttpError)
      ).subscribe(data => {
        this.dataCache = data;
        this.roles.next(data);
      });
    }
    return this.roles;
  }

  updateRole(roleId: number, transform: (original: Role) => Role) {
    const found = this.dataCache.find(role => role.id === roleId);
    if (found) {
      const updated = transform(found);
      this.dataCache = this.dataCache.map(role => role.id === roleId ? updated : role);
      this.roles.next(this.dataCache);
    }
  }
}

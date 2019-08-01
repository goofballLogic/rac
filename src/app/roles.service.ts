import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './app-config.module';
import { catchError, retry, tap } from 'rxjs/operators';
import { buildHttpErrorHandler } from './error-handling.module';

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

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  getRoles() {
    const endpoint = this.config.rolesEndpoint;
    return this.http.get<Role[]>(endpoint).pipe(
      retry(3),
      catchError(handleHttpError)
    );
  }
}

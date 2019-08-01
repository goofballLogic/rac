import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './app-config.module';
import { catchError, retry } from 'rxjs/operators';
import { buildHttpErrorHandler } from './error-handling.module';

const handleHttpError = buildHttpErrorHandler("An error occurred fetching users");

export interface User {
  id: number;
  name: string;
  roles: number[];
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  getUsers() {
    const endpoint = this.config.usersEndpoint;
    return this.http.get<User[]>(endpoint).pipe(
      retry(3),
      catchError(handleHttpError)
    );
  }
}

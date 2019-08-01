import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './app-config.module';
import { catchError, retry } from 'rxjs/operators';
import { buildHttpErrorHandler } from './error-handling.module';
import { BehaviorSubject } from 'rxjs';

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
  private users: BehaviorSubject<User[]>;
  private dataCache: User[];

  constructor(
    private http: HttpClient,
    @Inject(APP_CONFIG) private config: AppConfig) { }

  getUsers() {
    const endpoint = this.config.usersEndpoint;
    if (!this.users) {
      this.users = new BehaviorSubject([]);
      this.http.get<User[]>(endpoint).pipe(
        retry(3),
        catchError(handleHttpError)
      ).subscribe(data => {
        this.dataCache = data;
        this.users.next(data);
      });
    }
    return this.users;
  }

  updateUser(userId: number, transform: (original: User) => User) {
    const found = this.dataCache.find(user => user.id === userId);
    if (found) {
      const updated = transform(found);
      this.dataCache = this.dataCache.map(user => user.id === userId ? updated : user);
      this.users.next(this.dataCache);
    }
  }

}

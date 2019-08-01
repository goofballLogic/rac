import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './users.service';
import { AppConfigModule } from './app-config.module';

describe('UsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppConfigModule
      ],
      providers: [UsersService]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));
});

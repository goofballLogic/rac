import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RolesService } from './roles.service';
import { AppConfigModule } from './app-config.module';

describe('RolesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        AppConfigModule
      ],
      providers: [RolesService]
    });
  });

  it('should be created', inject([RolesService], (service: RolesService) => {
    expect(service).toBeTruthy();
  }));
});

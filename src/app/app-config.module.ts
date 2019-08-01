import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

// thanks: https://stackoverflow.com/a/43193574

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  usersEndpoint: string;
  rolesEndpoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
  usersEndpoint: environment.usersEndpoint,
  rolesEndpoint: environment.rolesEndpoint
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }

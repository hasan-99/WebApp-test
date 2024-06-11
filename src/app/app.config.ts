import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: MessageService },

    // Global Modules
    importProvidersFrom(
      BrowserAnimationsModule,

  ),
  provideHttpClient(withInterceptorsFromDi()), // HttpClientModule

  // Routes
  provideRouter(routes)
    ]
};

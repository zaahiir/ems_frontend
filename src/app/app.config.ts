import { ApplicationConfig, importProvidersFrom, isDevMode } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';

import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthErrorInterceptor } from './auth/auth-error.interceptor';
import { ErrorHandlerService } from './auth/error-handler.service';
import { ErrorHandler } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimations(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorHandlerService }
  ]
};

// Browser-specific configuration
export const browserConfig: ApplicationConfig = {
  providers: [
    ...appConfig.providers,
    // Add any browser-specific providers here
  ]
};

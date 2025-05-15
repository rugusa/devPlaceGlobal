import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ScriptService } from './services/script.service';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), HttpClient, ScriptService]
};

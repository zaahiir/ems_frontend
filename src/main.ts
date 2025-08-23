/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { browserConfig } from './app/app.config';

bootstrapApplication(AppComponent, browserConfig)
  .catch(err => console.error(err));


import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import { AppModule } from './app/app.module'; // Import your root NgModule
  import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));


// Use the traditional bootstrapping method
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
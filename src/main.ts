import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

  // if(!navigator.geolocation) {
    
  // }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

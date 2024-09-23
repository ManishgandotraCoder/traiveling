import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Ensure the correct path to app.module.ts

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideIonicAngular } from '@ionic/angular/standalone';

export function provideIonicUiLib(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideIonicAngular()
  ]);
}

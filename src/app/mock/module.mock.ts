import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MockSliderComponent } from './slider/slider.mock';
import {
  MockTranslatePipe,
  MockTranslateService,
} from './translate/translate.mock';

@NgModule({
  imports: [],
  exports: [MockTranslatePipe, MockSliderComponent],
  declarations: [MockTranslatePipe, MockSliderComponent],
  providers: [
    { provide: TranslateService, useClass: MockTranslateService },
    MockTranslatePipe,
  ],
})
export class MockModule {
  static forRoot(config: {}): ModuleWithProviders<MockModule> {
    return {
      ngModule: MockModule,
      providers: [
        MockTranslatePipe,
        { provide: TranslateService, useClass: MockTranslateService },
      ],
    };
  }
}

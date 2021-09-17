import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'mv-slider',
})
export class MockSliderComponent {
  @Input() value: number;
  @Input() min: number;
  @Input() max: number;
  @Input() scale: string;
}

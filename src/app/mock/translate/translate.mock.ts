import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable()
export class MockTranslateService {
  setDefaultLang(lang: string) {}
}

@Pipe({
  name: 'translate',
})
export class MockTranslatePipe implements PipeTransform {
  transform(value: any, ...args: any[]) {
    return [value, args];
  }
}

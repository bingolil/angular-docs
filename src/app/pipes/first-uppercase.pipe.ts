import { Pipe, PipeTransform } from '@angular/core';

/**
 * example1:
 * <p>{{'aaa' | firstUppercase}}</p>
 */
@Pipe({
  name: 'firstUppercase',
})
export class FisrtUpperCasePipe implements PipeTransform {
  transform(str: string, always = false): string {
    if (!str) return '';
    if (!always) return str.slice(0, 1).toUpperCase() + str.slice(1);
    const arr = str
      .split(' ')
      .map((dd) => dd.slice(0, 1).toUpperCase() + dd.slice(1));
    return arr.join(' ');
  }
}

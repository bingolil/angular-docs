import { Pipe, PipeTransform } from '@angular/core';

/**
 * example1:
 * <p>{{'AAA' | firstLowercase}}</p> // aAA
 */
@Pipe({
  name: 'firstLowercase',
})
export class FisrtLowerCasePipe implements PipeTransform {
  transform(str: string, always = false): string {
    if (!str) return '';
    if (!always) return str.slice(0, 1).toLowerCase() + str.slice(1);
    const arr = str
      .split(' ')
      .map((dd) => dd.slice(0, 1).toLowerCase() + dd.slice(1));
    return arr.join(' ');
  }
}

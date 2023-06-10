import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface HighlightConfig {
  value: string;
  style?: { [key: string]: string; };
}

/**
 * example1:
 * <div [innerHTML]="'item' | highlight: { value: 'it',style:{'background-color':'yellow'} }"></div>
 * 
 * example2:
 * <div [innerHTML]="'item' | highlight:'it'"></div>
 */
@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(str: string, params: HighlightConfig | string): SafeHtml {
    const { value = params, style = { color: '#dc3545' } } = params as HighlightConfig;
    const reg = new RegExp(`${value}+`, 'gi');
    const addStyleFn = (oldStyle: string, key: string): string => {
      return oldStyle + `${key}:${style![key]};`;
    };
    const styleStr = Object.keys(style).reduce(addStyleFn, '');
    const htmlStr = str.replace(reg, match => `<span style="${styleStr}">${match}</span>`);
    return this.domSanitizer.bypassSecurityTrustHtml(htmlStr);
  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface HighlightConfig {
  keyword: string;
  highlightStyle?: { [key: string]: string; };
}

/**
 * example:
 * <div [innerHTML]="'item' | highlight: { keyword: 'it',highlightStyle:{'background-color':'black'} }">
 */
@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: string, config: HighlightConfig): SafeHtml {
    const { keyword, highlightStyle = { color: '#dc3545' } } = config;
    const reg = new RegExp(`${keyword}+`, 'gi');
    const reduceStyle = (style: string, key: string): string => {
      return style + `${key}:${highlightStyle[key]};`;
    };
    const styleStr = Object.keys(highlightStyle).reduce(reduceStyle, '');
    const str = value.replace(reg, match => `<span style="${styleStr}">${match}</span>`);
    return this.domSanitizer.bypassSecurityTrustHtml(str);
  }

}

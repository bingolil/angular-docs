import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autoSzie]',
})
export class AutoSizeDirective {
  @Input() autoSize = { minRows: 1, maxRows: Infinity };

  constructor(private elementRef: ElementRef) {}
}

import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * example:
 * <input type="text" trim [(ngModel)]="test">
 */
@Directive({
  selector: '[trim]',
})
export class TrimDirective {
  @HostListener('blur') onBlur() {
    const value = this.formControl.value;
    this.formControl.control?.setValue(value.trim());
  }

  constructor(private formControl: NgControl) {}
}

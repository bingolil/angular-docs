import { Directive, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

/**
 * example:
 * <input type="text" trim [(ngModel)]="test">
 */
@Directive({
  selector: '[trim]'
})
export class TrimDirective {

  @HostListener('blur') onBlur() {
    let value = this.formControl.value;
    value = value ? value.trim() : "";
    this.formControl.control?.setValue(value);
  }

  constructor(private formControl: NgControl) { }

}

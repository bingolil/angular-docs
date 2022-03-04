import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { ScrollFixDirective } from './scroll-fix.directive';
import { ValidateEqualDirective } from './validate-equal.directive';
import { ValidateArrLengthDirective } from './validate-arr-length.directive';

@NgModule({
  declarations: [
    ClickOutsideDirective,
    ScrollFixDirective,
    ValidateArrLengthDirective,
    ValidateEqualDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ClickOutsideDirective,
    ScrollFixDirective,
    ValidateEqualDirective,
    ValidateArrLengthDirective
  ]
})
export class DirectivesModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { ScrollFixDirective } from './scroll-fix.directive';
import { ValidateEqualDirective } from './validate-equal.directive';
import { ValidateArrLengthDirective } from './validate-arr-length.directive';
import { TrimDirective } from './trim.directive';

const directives = [
  ClickOutsideDirective,
  ScrollFixDirective,
  ValidateArrLengthDirective,
  ValidateEqualDirective,
  TrimDirective
];

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives]
})
export class DirectivesModule { }

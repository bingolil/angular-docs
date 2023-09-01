import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
import { ScrollFixDirective } from './scroll-fix.directive';
import { VerifyEqualDirective } from './verify-equal.directive';
import { VerifyLengthDirective } from './verify-length.directive';
import { TrimDirective } from './trim.directive';
import { VerifyTimeDirective } from './verify-time.directive';
import { VerifyDateDirective } from './verify-date.directive';

const directives = [
  ClickOutsideDirective,
  ScrollFixDirective,
  VerifyLengthDirective,
  VerifyEqualDirective,
  VerifyDateDirective,
  VerifyTimeDirective,
  TrimDirective,
];

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives],
})
export class DirectivesModule {}

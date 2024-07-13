import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './click-outside.directive';
import { ScrollFixedDirective } from './scroll-fix.directive';
import { VerifyEqualDirective } from './verify-equal.directive';
import { TrimDirective } from './trim.directive';
import { AutoSizeDirective } from './auto-size.directive';

const directives = [
  ClickOutsideDirective,
  ScrollFixedDirective,
  VerifyEqualDirective,
  AutoSizeDirective,
  TrimDirective,
];

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives],
})
export class DirectivesModule {}

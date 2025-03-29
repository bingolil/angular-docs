import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClickOutsideDirective } from './click-outside.directive';
import { ScrollFixDirective } from './scroll-fix.directive';
import { VerifyEqualDirective } from './verify-equal.directive';
import { TrimDirective } from './trim.directive';
import { FullscreenDirective } from './fullscreen.directive';

const directives = [
  ClickOutsideDirective,
  FullscreenDirective,
  ScrollFixDirective,
  TrimDirective,
  VerifyEqualDirective,
];

@NgModule({
  declarations: [...directives],
  imports: [CommonModule],
  exports: [...directives],
})
export class DirectivesModule {}

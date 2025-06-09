import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './highlight.pipe';
import { ByteSizePipe } from './byte-size.pipe';
import { FisrtUpperCasePipe } from './first-uppercase.pipe';
import { FisrtLowerCasePipe } from './first-lowerccase.pipe';
import { SafeHtmlPipe } from './safe-html.pipe';

const pipes = [
  HighlightPipe,
  ByteSizePipe,
  FisrtLowerCasePipe,
  FisrtUpperCasePipe,
  SafeHtmlPipe,
];

@NgModule({
  declarations: [...pipes],
  imports: [CommonModule],
  exports: [...pipes],
})
export class PipesModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightPipe } from './highlight.pipe';
import { ByteSizePipe } from './byte-size.pipe';
import { FisrtUpperCasePipe } from './first-uppercase.pipe';
import { FisrtLowerCasePipe } from './first-lowerccase.pipe';

const pipes = [
  HighlightPipe,
  ByteSizePipe,
  FisrtLowerCasePipe,
  FisrtUpperCasePipe,
];

@NgModule({
  declarations: [...pipes],
  imports: [CommonModule],
  exports: [...pipes],
})
export class PipesModule {}

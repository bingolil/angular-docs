import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingUIComponent } from './loading-ui/loading-ui.component';

@NgModule({
  declarations: [LoadingUIComponent],
  imports: [CommonModule],
  exports: [LoadingUIComponent],
})
export class LoadingModule {}

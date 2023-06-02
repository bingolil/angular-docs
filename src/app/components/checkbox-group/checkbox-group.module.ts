import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';

@NgModule({
  declarations: [CheckboxGroupComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule
  ],
  exports: [CheckboxGroupComponent]
})
export class CheckboxGroupModule { }

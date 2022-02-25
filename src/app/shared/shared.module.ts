import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObserversModule } from '@angular/cdk/observers';
import { TranslateModule } from '@ngx-translate/core';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { BasicTableComponent } from './basic-table/basic-table.component';


@NgModule({
  declarations: [
    CheckboxGroupComponent,
    DynamicFormComponent,
    BasicTableComponent,
  ],
  imports: [
    CommonModule,
    ObserversModule,
    TranslateModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzRadioModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTimePickerModule,
    NzCheckboxModule,
    NzPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CheckboxGroupComponent,
    DynamicFormComponent,
    BasicTableComponent,
  ]
})
export class SharedModule { }

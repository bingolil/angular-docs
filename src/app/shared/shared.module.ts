import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObserversModule } from '@angular/cdk/observers';

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

import { LoadingUiComponent } from './loading-ui/loading-ui.component';
import { CheckboxGroupComponent } from './checkbox-group/checkbox-group.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { TableComponent } from './table/table.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LoadingUiComponent,
    CheckboxGroupComponent,
    DynamicFormComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    NzFormModule,
    ObserversModule,
    TranslateModule,
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
    LoadingUiComponent,
    CheckboxGroupComponent,
    DynamicFormComponent,
    TableComponent
  ]
})
export class SharedModule { }

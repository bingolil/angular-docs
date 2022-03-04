import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTableComponent } from './basic-table/basic-table.component';
import { ObserversModule } from '@angular/cdk/observers';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [BasicTableComponent],
  imports: [
    CommonModule,
    NzPaginationModule,
    TranslateModule,
    ObserversModule
  ],
  exports: [BasicTableComponent]
})
export class BasicTableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { UploadComponent } from './upload/upload.component';

@NgModule({
  declarations: [
    UploadComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzButtonModule,
    NzUploadModule

  ],
  exports: [UploadComponent]
})
export class UploadModule { }

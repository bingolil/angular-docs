import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    UploadFileComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    NzButtonModule,
    NzUploadModule

  ],
  exports: [UploadFileComponent]
})
export class UploadFileModule { }

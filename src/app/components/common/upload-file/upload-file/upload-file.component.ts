import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NzUploadFile, NzUploadListType } from 'ng-zorro-antd/upload';

import { ResultCode } from 'src/app/constant';
import { HttpService } from 'src/app/services/base/http.service';

// 上传文件组件
@Component({
  selector: 'docs-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UploadFileComponent implements OnInit {

  /** 上传组件，上传url地址 */
  @Input() url = 'demo-upload-api';
  /** 上传组件，上传参数 */
  @Input() params: { key: string, value: any }[] = [];
  /** 是否开启Ctrl多选文件 */
  @Input() multiple = true;
  /** 上传文件的最大个数 */
  @Input() limit = 0;
  /** true只能选择文件夹，默认false只能选择文件 */
  @Input() directory = false;
  /** 文件列表展示方式 */
  @Input() listType: NzUploadListType = 'text';
  /** 是否展示上传按钮 */
  @Input() showUploadBtn = true;

  /** 是否在上传中 */
  uploading = false;
  /** 上传的文件列表 */
  fileList: NzUploadFile[] = [];

  constructor(
    private httpService: HttpService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  // 使用svg 在angular.json文件"assets"资源中添加一下对象
  // {
  //   "glob": "**/*",
  //   "input": "./node_modules/@ant-design/icons-angular/src/inline-svg/",
  //   "output": "/assets/"
  // }

  /**
   * @description 上传文件之前的钩子
   * @param file  上传的文件
   * @returns 若返回 false 则停止上传
   */
  beforeUpload = (file: NzUploadFile): boolean => {
    if (this.multiple) { // 上传多个文件
      this.fileList = this.fileList.concat(file);
    } else { // 上传单个文件
      this.fileList = [file];
    }
    return false;
  };

  /**
   * @description 手动上传文件
   */
  handleUpload(): void {

    if (this.limit !== 0 && this.limit < this.fileList.length) { // 文件数量过大
      const msg = this.translate.instant('pages.upload.limitErrMsg', { limit: this.limit });
      console.log(msg);
      return;
    }
    const formData = new FormData();
    this.fileList.forEach((file: any) => formData.append('files[]', file));
    if (Array.isArray(this.params)) {
      this.params.forEach(item => formData.append(item.key, item.value));
    }
    this.uploading = true;

    this.httpService.post({ url: this.url, data: formData }).subscribe(res => {
      this.uploading = false;
      if (res.code === ResultCode.Ok) { // 上传成功，清理已选文件
        this.fileList = [];
      }
      this.cdr.markForCheck();
    })
  }

}

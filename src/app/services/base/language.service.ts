import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { langValueType } from 'src/app/types';
import { StorageUtil } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private translate: TranslateService) { }

  /**
   * @description 切换语言
   * @param lang 切换后的语言
   */
  switchLanguage(lang: langValueType): void {
    this.translate.setDefaultLang(lang);
    StorageUtil.setLang(lang); // 将语言写入 local storage
  }

}

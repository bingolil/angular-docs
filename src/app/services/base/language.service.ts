import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { en_US, NzI18nService, zh_CN } from 'ng-zorro-antd/i18n';
import { LANG } from 'src/app/constant';
import { langValueType } from 'src/app/types';
import { LangUtil, StorageUtil } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private translate: TranslateService,
    private i18nService: NzI18nService
  ) { }

  /**
   * @description 切换语言
   * @param lang 切换后的语言
   */
  switchLanguage(lang: langValueType): void {
    StorageUtil.setLang(lang); // 将语言写入 local storage
    this.translate.setDefaultLang(lang);
    this.i18nService.setLocale(LangUtil.getAntdLangInfo());
  }

}

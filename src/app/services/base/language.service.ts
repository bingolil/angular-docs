import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangValueType } from 'src/app/types';
import { StorageUtil } from 'src/app/utils';

/**
 * html
 * example1: <p>{{ "demo.lang" | translate }}</p>
 * example2: <p translate>demo.lang</p>
 * example3: <p [translate]="'demo.lang'"></p>
 * example4: <p>{{ "demo.welcomeMessage" | translate : { username: "用户名" } }}</p>
 *
 * ts
 * example1: this.translate.get('demo.lang').subscribe((res) => {});
 * example2:  this.translate.get('demo.welcomeMessage', { username: 'User' }).subscribe((res) => {});
 */

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {}

  /**
   * @description 切换语言
   * @param lang 切换后的语言
   */
  switchLanguage(lang: LangValueType): void {
    StorageUtil.setLang(lang); // 将语言写入 local storage
    this.translate.setDefaultLang(lang); // 国际化和组件库切换语言
  }
}

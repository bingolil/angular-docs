import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import zh from '@angular/common/locales/zh';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { en_US, NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LANG } from './constant';
import { StorageUtil } from './utils/storage-util';

import { LoadingModule } from './components/loading/loading.module';
registerLocaleData(en);
registerLocaleData(zh)

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: StorageUtil.getLang(),
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    LoadingModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: NZ_I18N, /** 配置 ng-zorro-antd 国际化 **/
      useFactory: () => {
        switch (StorageUtil.getLang()) {
          case LANG.zhCn:
            return zh_CN;
          case LANG.enUs:
            return en_US;
          default:
            return zh_CN
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

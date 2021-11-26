import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LANG } from './constant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  title = 'angular-docs';

  constructor(private translateService:TranslateService){
    this.translateService.use(LANG.zhCn);
  }

}

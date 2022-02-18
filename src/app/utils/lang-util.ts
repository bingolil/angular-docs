import { en_US, zh_CN } from "ng-zorro-antd/i18n";
import { StorageUtil } from ".";
import { LANG } from "../constant";

/** 语言工具 */
export class LangUtil {

  /**
   * @description 获取antd样式库语言信息
   * @returns antd样式库语言信息
   */
  static getAntdLangInfo() {
    switch (StorageUtil.getLang()) {
      case LANG.zhCn:
        return zh_CN;
      case LANG.enUs:
        return en_US;
      default:
        return zh_CN;
    }
  }
}
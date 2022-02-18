import { LANG } from "../constant";
import { langKeyType, langValueType } from "../types";


/** 本地存储工具 */
export class StorageUtil {

    /** 语言 */
    static lang = 'lang';

    /**
     * @description 获取语言
     * @returns 语言字符串
     */
    static getLang(): langValueType {
        let langStr = localStorage.getItem(this.lang) as langValueType;
        const langList = Object.keys(LANG).map(kk => LANG[kk as langKeyType]);

        if (!langStr || langList.indexOf(langStr) === -1) { // 语言不存在或存在的值错误
            langStr = LANG.zhCn;
            this.setLang(langStr);
        }
        return langStr;
    }

    /** 
     * @description 设置语言
     * @param lang 语言
     */
    static setLang(lang: langValueType): void {
        localStorage.setItem(this.lang, lang);
    }

}

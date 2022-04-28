import { TypeJudgeUtil } from "./type-judge-util";

/** 对象工具 */
export class ObjectUtil {

    /**
     * @description 深度拷贝
     * @param obj 被深度拷贝对象
     * @returns 深度拷贝的新对象
     */
    static deepCopy<T>(obj: T): T {
        let resultObj: any;
        if (Array.isArray(obj)) {
            resultObj = [];
            obj.forEach(item => resultObj.push(this.deepCopy(item)));
        } else if (TypeJudgeUtil.isObject(obj)) {
            resultObj = {};
            for (let key in obj) {
                resultObj[key] = this.deepCopy(obj[key]);
            }
        } else {
            resultObj = obj;
        }
        return resultObj;
    }

    /**
     * @description 清理对象属性值为字符串的值前后空格
     * @param obj 清理的对象
     * @returns 清理后的新对象
     */
    static clearEmptyString<T>(obj: T): T {
        let resultObj: any;
        if (typeof (obj) === 'string') { // 字符串
            resultObj = obj.trim();
        } else if (Array.isArray(obj)) { // 数组
            resultObj = [];
            obj.forEach(item => resultObj.push(this.clearEmptyString(item)));
        } else if (TypeJudgeUtil.isObject(obj)) { // 对象
            resultObj = {};
            for (let key in obj) {
                resultObj[key] = this.clearEmptyString(obj[key]);
            }
        } else {
            resultObj = obj;
        }
        return resultObj;
    }

}

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

    /**
     * @description 判断两个对象的值是否相等（不能判断节点是否相等）
     * @param obj1 参数对象1
     * @param obj2 参数对象2
     * @returns 判断两个对象是否相等，true相等，false不相等
     */
    static isEqual(obj1: any, obj2: any): boolean {
        if (obj1 === obj2) return true; // 指向同一内存
        const type1 = Object.prototype.toString.call(obj1);
        const type2 = Object.prototype.toString.call(obj2);
        if (type1 !== type2) return false; // 数据类型不一致
        if (TypeJudgeUtil.isObject(obj1)) {
            if (Object.keys(obj1).length !== Object.keys(obj2).length) return false; // 下标长度不一致
            for (let prop1 in obj1) {
                if (!obj2.hasOwnProperty(prop1)) return false; // obj1中存在obj2没有的下标key
                if (!this.isEqual(obj1[prop1], obj2[prop1])) return false;
            }
        } else if (TypeJudgeUtil.isArray(obj1)) {
            if (obj1.length !== obj2.length) return false; // 数组长度不一致
            for (let i = 0; i < obj1.length; i++) {
                if (!this.isEqual(obj1[i], obj2[i])) return false;
            }
        } else if (obj1.toString() !== obj2.toString()) {
            return false; // Date Function RegExp
        };
        return true;
    }

}

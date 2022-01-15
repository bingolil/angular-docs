/** 对象工具 */
export class ObjectUtil {

    /**
     * 深度拷贝
     * @param obj 被深度拷贝对象
     * @returns 深度拷贝的新对象
     */
    static deepCopy<T>(obj: T): T {
        let o: any;
        if (Array.isArray(obj)) {
            o = [];
            obj.forEach(item => o.push(this.deepCopy(item)));
        } else if (Object.prototype.toString.call(obj) === '[object Object]') {
            o = {};
            for (let key in obj) {
                o[key] = this.deepCopy(obj[key]);
            }
        } else {
            o = obj;
        }
        return o;
    }

    /**
     * 清理对象属性值为字符串的值空格
     * @param obj 清理的对象
     * @returns 清理后的新对象
     */
    static trimSpace<T>(obj: T): T {
        let o: any;
        if (typeof (obj) === 'string') { // 字符串
            o = obj.trim();
        } else if (Array.isArray(obj)) { // 数组
            o = [];
            obj.forEach(item => o.push(this.trimSpace(item)));
        } else if (Object.prototype.toString.call(obj) === '[object Object]') { // 对象
            o = {};
            for (let key in obj) {
                o[key] = this.trimSpace(obj[key]);
            }
        } else {
            o = obj;
        }
        return o;
    }

}

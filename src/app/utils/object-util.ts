/** 对象公交 */
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
}

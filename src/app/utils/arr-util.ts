/** 数组工具 */
export class ArrUtil {

    /**
     * 根据对象数组的某个属性去重
     * @param arr 目标数组
     * @param u_key 去重的属性名称
     * @returns 去重后的数组
     */
    static unique<T extends Object, K extends keyof T>(arr: Array<T>, u_key: K): Array<T> {
        const map = new Map();
        arr.forEach(item => {
            if (!map.has(item[u_key])) {
                map.set(item[u_key], item);
            }
        })
        return [...map.values()];
    }

}

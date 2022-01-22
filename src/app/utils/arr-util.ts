/** 数组工具 */
export class ArrUtil {

    /**
     * @description 根据对象数组的某个属性去重
     * @param arr 目标数组
     * @param u_key 去重的属性名称
     * @returns 去重后的数组
     */
    static uniqueByProps<T extends Object, K extends keyof T>(arr: Array<T>, u_key: K): Array<T> {
        const map = new Map();
        arr.forEach(item => {
            if (!map.has(item[u_key])) {
                map.set(item[u_key], item);
            }
        })
        return [...map.values()];
    }

    /**
     * @description 根据对象数组的某个属性排序
     * @param arr 排序的数组
     * @param u_key 排序的属性名称
     * @param isAsc true升序，false降序
     * @returns 排序后的数组
     */
    static sortByProps<T extends Object, K extends keyof T>(arr: T[], u_key: K, isAsc = true): T[] {
        const resultArr = arr.sort((a, b) => {
            if (a[u_key] === b[u_key]) {
                return 0;
            } else if (a[u_key] > b[u_key]) {
                return isAsc ? 1 : -1;
            } else {
                return isAsc ? -1 : 1;
            }
        });
        return resultArr;
    }


}

import * as _ from 'lodash';

/** 对象工具 */
export class ObjectUtil {
  /**
   * @description 深度拷贝
   * @param obj 被深度拷贝对象
   * @returns 深度拷贝的新对象
   */
  static deepCopy<T>(obj: T): T {
    return _.cloneDeep(obj);
  }

  /**
   * @description 判断两个对象的值是否相等（不能判断节点是否相等）
   * @param obj1 参数对象1
   * @param obj2 参数对象2
   * @returns 判断两个对象是否相等，true相等，false不相等
   */
  static isEqual(obj1: any, obj2: any): boolean {
    return _.isEqual(obj1, obj2);
  }
}

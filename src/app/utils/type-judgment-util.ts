/** 类型判断工具 */
export class TypeJudgmentUtil {

  /**
   * @description 判断数据是否为Object类型
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
  }

  /**
   * @description 判断数据是否为数组类型
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isArray(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Array]';
  }

  /**
   * @description 判断数据是否为Boolean类型
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isBoolean(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Boolean]';
  }


  /**
   * @description 判断数据是否为number类型
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isNumber(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Number]';
  }

  /**
   * @description 判断数据是否为number类型且不为NaN
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isNumberAndNotIsNaN(obj: any): boolean {
    return TypeJudgmentUtil.isNumber(obj) && !Number.isNaN(obj)
  }

  /**
   * @description 判断数据是否为string类型
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isString(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object String]';
  }

  /**
   * @description 判断数据是否为Date类型
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isDate(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Date]';
  }

  /**
   * @description 判断数据是否为Function
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isFunction(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Function]';
  }

  /**
   * @description 判断数据是否为正则表达式
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isRegExp(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
  }

  /**
   * @description 判断数据是否为null
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isNull(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Null]';
  }

  /**
   * @description 判断数据是否为undefined
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isUndefined(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Undefined]';
  }

  /**
   * @description 判断数据是否为null或undefined
   * @param obj 判断的数据
   * @returns 判断结果
   */
  static isNullOrUndefined(obj: any): boolean {
    return TypeJudgmentUtil.isNull(obj) || TypeJudgmentUtil.isUndefined(obj);
  }

}
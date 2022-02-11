/** 校验类型 */
type ValidatorType = 'required' // 必填
    | 'min' // 最小值
    | 'max' // 最大值
    | 'minLength' // 字符串最短长度
    | 'maxLength' // 字符串最长长度
    | 'regexp' // 正则表达式
    | 'email' // 邮件
    | 'arrLength'; // 数组长度

/** 校验信息接口 */
export interface ValidatorItem {
    /** 校验类型 */
    type: ValidatorType;
    /** 提示信息 */
    msg: string;
    /** 值 */
    value?: number | RegExp;
    /** 数组长度最小值 */
    min?: number;
    /** 数组长度最大值 */
    max?: number;
}

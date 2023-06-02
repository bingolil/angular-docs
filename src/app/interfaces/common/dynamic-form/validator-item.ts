/** 校验类型 */
type ValidatorType = 'required' // 必填
    | 'min' // 最小值
    | 'max' // 最大值
    | 'minlength' // 字符串最短长度
    | 'maxlength' // 字符串最长长度
    | 'pattern' // 正则校验
    | 'email' // 邮件
    | 'validateEqual' // 校验值相等，example：确认密码
    | 'validateArrLength'; // 校验数组长度

/** 校验信息接口 */
export interface ValidatorItem {
    /** 校验类型 */
    type: ValidatorType;
    /** 提示信息 */
    msg: string;
    /** 
     * type为min，max，minLength，maxLength时，值为number类型；
     * type为pattern时，值为Regexp类型
     */
    value?: number | RegExp;
    /** 数组长度最小值 */
    min?: number;
    /** 数组长度最大值 */
    max?: number;
    /** 比较值时，比较的属性名称 */
    equalAttrName?: string;
    /** 比较值时，是否监听当前控件，存在监听时，不展示错误信息 */
    hasListener?: boolean;
}

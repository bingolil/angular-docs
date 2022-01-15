import { ValidatorType } from "src/app/class/dynamic-form/form-field";

/** 校验信息接口 */
export interface ValidatorDetail {
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

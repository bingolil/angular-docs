import { BasicControl } from "./basic-control";

/** 数字输入框控件类实例化参数接口 */
export interface InputNumberControl extends BasicControl<number> {
    /** input-number 最小值 */
    min?: number;
    /** input-number 最大值 */
    max?: number;
    /** input-number 单位最小值 */
    step?: number;
}
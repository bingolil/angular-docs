import { BasicControl } from "./basic-control";
import { OptionItem } from "./option-item";

/** 单选按钮控件类实例化参数接口 */
export interface RadioGroupControl extends BasicControl<any> {
    /**列表组 */
    options?: OptionItem[];
}
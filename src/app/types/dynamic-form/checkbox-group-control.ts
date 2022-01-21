import { BasicControl } from "./basic-control";
import { OptionItem } from "./option-item";

/** 多选按钮组控件类实例化参数接口 */
export interface CheckboxGroupControl extends BasicControl<any[]> {
    /**列表组 */
    options?: OptionItem[];
}
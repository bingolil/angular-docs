import { NzSelectModeType } from "ng-zorro-antd/select";
import { BasicControl } from "./basic-control";
import { OptionItem } from "./option-item";

/** 下拉框控件类实例化参数接口 */
export interface SelectDropdownControl extends BasicControl<any> {
    /**列表组 */
    options?: OptionItem[];
    /** select 选择模式 'multiple' | 'tags' | 'default' */
    mode?: NzSelectModeType;
    /** select 是否支持清除 */
    allowClear?: boolean;
}
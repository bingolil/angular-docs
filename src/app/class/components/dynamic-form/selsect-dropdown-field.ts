import { NzSelectModeType } from "ng-zorro-antd/select";
import { OptionItem } from "src/app/interfaces/common/dynamic-form";
import { BasicField } from "./basic-field";

export class SelectDropdownField extends BasicField<any>{

    /** 控件类型：单选框组 */
    type = 'selectDropdown';

    /** 多选列表组 */
    options: OptionItem[];
    /** select 选择模式 'multiple' | 'tags' | 'default' */
    mode: NzSelectModeType;
    /** select 是否支持清除 */
    allowClear: boolean;

    constructor(options: SelectDropdownField) {
        super(options);
        this.options = options.options || [];
        this.mode = options.mode || 'default';
        this.allowClear = options.allowClear || false;
    }

}
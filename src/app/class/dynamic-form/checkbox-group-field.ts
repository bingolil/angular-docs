import { CheckboxGroupControl, OptionItem } from "src/app/types/dynamic-form";
import { BasicField } from "./basic-field";

export class CheckboxGroupField extends BasicField<any>{

    /** 控件类型：单选框组 */
    type = 'checkboxGroup';

    /** 多选列表组 */
    options: OptionItem[];

    constructor(options: CheckboxGroupControl) {
        super(options);
        this.options = options.options || [];
    }

}
import { BasicControl } from "src/app/interfaces/dynamic-form/basic-control";
import { BasicField } from "./basic-field";

export class InpuTextField extends BasicField<string>{

    /** 控件类型：文本输入框 */
    type = 'inputText';

    constructor(options: BasicControl<string>) {
        super(options)
    }
}
import { BasicControl } from "src/app/interfaces/components/common/dynamic-form/basic-control";
import { BasicField } from "./basic-field";

export class InputTextField extends BasicField<string>{

    /** 控件类型：文本输入框 */
    type = 'inputText';

    constructor(options: BasicControl<string>) {
        super(options)
    }
}
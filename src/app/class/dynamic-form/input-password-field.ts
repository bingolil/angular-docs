import { BasicControl } from "src/app/types/dynamic-form/basic-control";
import { BasicField } from "./basic-field";

export class InputPasswordField extends BasicField<string>{

    /** 控件类型：密码输入框 */
    type = 'inputPassowrd';

    constructor(options: BasicControl<string>) {
        super(options)
    }
}
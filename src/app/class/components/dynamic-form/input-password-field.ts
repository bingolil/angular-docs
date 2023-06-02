import { BasicField } from "./basic-field";

export class InputPasswordField extends BasicField<string>{

    /** 控件类型：密码输入框 */
    type = 'inputPassowrd';

    constructor(options: InputPasswordField) {
        super(options)
    }
}
import { BasicField } from "./basic-field";

export class TextareaField extends BasicField<string>{

    /** 控件类型：文本输入框 */
    type = 'textArea';

    /** textarea 文本输入框行高配置 */
    rowsConfig: { minRows: number, maxRows: number };

    constructor(options: TextareaField) {
        super(options);
        this.rowsConfig = {
            minRows: options.rowsConfig?.minRows || 1,
            maxRows: options.rowsConfig?.maxRows || Infinity
        };

    }
}
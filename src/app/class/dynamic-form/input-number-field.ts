import { InputNumberControl } from "src/app/types/dynamic-form";
import { BasicField } from "./basic-field";

export class InputNumberField extends BasicField<number>{

    /** 控件类型：密码输入框 */
    type = 'inputNumber';

    /** input-number 最小值 */
    min: number;
    /** input-number 最大值 */
    max: number;
    /** input-number 单位最小值 */
    step: number;

    constructor(options: InputNumberControl) {
        super(options);
        this.min = options.min || 0;
        this.max = options.max || Infinity;
        this.step = options.step || 1;
    }
}
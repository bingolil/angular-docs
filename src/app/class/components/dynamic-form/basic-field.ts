import { ValidatorItem } from "src/app/interfaces/common/dynamic-form/validator-item";

export class BasicField<T> {
    /** 当前控件项的值 */
    value: T | null;
    /** 响应式表单绑定的属性 */
    key: string;
    /** 表单控件项描述 */
    label: string;
    /** 表单控件是否可用 */
    disabled?: boolean;
    /** 表单控件是否只读 */
    readonly?: boolean;
    /** 表单控件占位内容 */
    placeholder?: string | string[];
    /** 校验列表 */
    validatorList?: ValidatorItem[];

    constructor(options: BasicField<T>) {
        this.key = options.key || '';
        this.label = options.label || '';
        this.value = options.value === undefined ? null : options.value;
        this.disabled = !!options.disabled;
        this.readonly = !!options.readonly;
        this.placeholder = options.placeholder || '';
        this.validatorList = options.validatorList || [];
    }
}

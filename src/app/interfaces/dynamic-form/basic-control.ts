import { ValidatorItem } from "./validator-item";

/** 基础控件接口 */
export interface BasicControl<T> {
    /** 当前表单的值 */
    value: T | undefined;
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
}
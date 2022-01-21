import { BasicControl } from "./basic-control";

/** 多行文本输入框控件类实例化参数接口 */
export interface TextareaControl extends BasicControl<string> {
    /** text-area 文本输入框行高配置 */
    rowsConfig?: { minRows?: number, maxRows?: number };
}
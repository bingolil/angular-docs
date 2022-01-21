import { BasicControl } from "./basic-control";

/** 时间控件类实例化参数接口 */
export interface TimeControl extends BasicControl<Date | number> {
    /** 12小时制 */
    use12Hours?: boolean;
    /** 时间格式 */
    format?: string;
    /** 小时间隔 */
    hourStep?: number;
    /** 分钟间隔 */
    minuteStep?: number;
    /** 秒间隔 */
    secondStep?: number;
    /** 不可选小时列表 */
    disabledHours?: (() => number[]) | undefined;
    /** 不可选分钟列表 */
    disabledMinutes?: ((hour: number) => number[]) | undefined;
    /** 不可选秒列表 */
    disabledSeconds?: ((hour: number, minute: number) => number[]) | undefined;
}
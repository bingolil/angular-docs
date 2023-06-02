import { BasicField } from "./basic-field";

export class TimeField extends BasicField<Date | number | string> {

    /** 控件类型：时间 */
    type = 'time';

    /** 12小时制 */
    use12Hours: boolean;
    /** 时间格式 */
    format: string;
    /** 小时间隔 */
    hourStep: number;
    /** 分钟间隔 */
    minuteStep: number;
    /** 秒间隔 */
    secondStep: number;
    /** 不可选小时列表 */
    disabledHours: (() => number[]) | undefined;
    /** 不可选分钟列表 */
    disabledMinutes: ((hour: number) => number[]) | undefined;
    /** 不可选秒列表 */
    disabledSeconds: ((hour: number, minute: number) => number[]) | undefined;

    constructor(options: TimeField) {
        super(options);
        this.use12Hours = !!options.use12Hours;
        this.format = options.format || 'HH:mm:ss';
        this.hourStep = options.hourStep || 1;
        this.minuteStep = options.minuteStep || 1;
        this.secondStep = options.secondStep || 1;
        this.disabledHours = options.disabledHours;
        this.disabledMinutes = options.disabledMinutes;
        this.disabledSeconds = options.disabledSeconds;
    }
}
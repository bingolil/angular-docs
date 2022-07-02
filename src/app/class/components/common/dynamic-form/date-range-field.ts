import { DisabledDateFn, DisabledTimeFn, NzDateMode } from "ng-zorro-antd/date-picker";
import { BasicField } from "./basic-field";

export class DateRangeField extends BasicField<Date[] | number[] | string[]> {

    /** 控件类型：日期范围 */
    type = 'dateRange';
    /** 日期展示格式  */
    format: string;
    /** 'year' | 'month' | 'week' | 'date' */
    mode: NzDateMode;
    /** 日期选择 是否展示时间 */
    showTime: boolean;
    /** 
     * 不可选时间
     *  example：
     *  disabledTimeFn = () => ({
        nzDisabledHours: () => [22,23],
        nzDisabledMinutes: () =>[30,31],
        nzDisabledSeconds: () => [55, 56]
      })
     */
    disabledTimeFn: DisabledTimeFn | undefined;
    /** 
     * 不可选日期
     * example：
     * disabledDateFn=(current:Date):boolean=>differenceInCalendarDays(current,new Date())>0
     * note: differenceInCalendarDays来自于 date-fns库
     */
    disabledDateFn: DisabledDateFn | undefined;
    /** 日期范围选择 预设范围 */
    ranges: { [key: string]: Date[] } | { [key: string]: () => Date[] };

    constructor(options: DateRangeField) {
        super(options);
        this.format = options.format || '';
        this.mode = options.mode || 'date';
        this.showTime = !!options.showTime;
        this.disabledDateFn = options.disabledDateFn;
        this.disabledTimeFn = options.disabledTimeFn;
        this.ranges = options.ranges || {};
    }
}
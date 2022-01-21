import { DisabledDateFn, DisabledTimeFn, NzDateMode } from "ng-zorro-antd/date-picker";
import { BasicControl } from ".";

/** 日期范围控件类实例化参数接口 */
export interface DateRangeControl extends BasicControl<Date[] | number[]> {
    /** 日期格式 */
    format?: string;
    /** 'year' | 'month' | 'week' | 'date' */
    mode?: NzDateMode;
    /** 日期选择 是否展示时间 */
    showTime?: boolean;
    /** 
    * 不可选时间
    *  example：
    *  disabledTimeFn = () => ({
       nzDisabledHours: () => [22,23],
       nzDisabledMinutes: () =>[30,31],
       nzDisabledSeconds: () => [55, 56]
     })
    */
    disabledTimeFn?: DisabledTimeFn;
    /** 
     * 不可选日期
     * example：
     * disabledDateFn=(current:Date):boolean=>differenceInCalendarDays(current,new Date())>0
     * note: differenceInCalendarDays来自于 date-fns库
     */
    disabledDateFn?: DisabledDateFn;
    /** 日期范围选择 预设范围 */
    ranges?: { [key: string]: Date[] } | { [key: string]: () => Date[] };
}
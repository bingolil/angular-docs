import { DisabledDateFn, DisabledTimeFn, NzDateMode } from "ng-zorro-antd/date-picker";
import { BasicControl } from "./basic-control";

/** 日期控件类实例化参数接口 */
export interface DateControl extends BasicControl<Date | number> {
  /** 日期或时间格式  */
  format?: string;
  /** 'year' | 'month' | 'week' | 'date' */
  mode?: NzDateMode;
  /** 是否展示今天按钮 */
  showToday?: boolean;
  /** 是否展示此刻按钮 */
  showNow?: boolean;
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
  disabledTimeFn?: DisabledTimeFn | undefined;
  /** 
   * 不可选日期
   * example：
   * disabledDateFn=(current:Date):boolean=>differenceInCalendarDays(current,new Date())>0
   * note: differenceInCalendarDays来自于 date-fns库
   */
  disabledDateFn?: DisabledDateFn | undefined;
}
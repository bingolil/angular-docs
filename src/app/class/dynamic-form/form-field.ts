import { DisabledDateFn, DisabledTimeFn, NzDateMode } from "ng-zorro-antd/date-picker";
import { NzSelectModeType } from "ng-zorro-antd/select";

import { OptionDetail } from "src/app/types/form/option-detail";
import { ValidatorDetail } from "src/app/types/form/validator-detail";

/** 表单控件类型 */
export type FormControlType = 'inputText' // 单行文本输入框
    | 'password' // 密码输入框
    | 'inputNumber' // 数字输入框
    | 'textArea' // 多行文本输入框
    | 'radioGroup' // 单选框
    | 'selectDropdown' // 下拉框
    | 'checkboxGroup' // 复选框组
    | 'dateRange' // 日期范围选择框
    | 'date' // 日期选择框
    | 'time'; // 时间选择框


/** 表单校验类型 */
export type ValidatorType = 'required' // 必填类型
    | 'min' // 数字最小类型
    | 'max' // 数字最大类型
    | 'minLength' // 字符串最短类型
    | 'maxLength' // 字符串最长类型
    | 'email' // 邮箱类型
    | 'regexp' // 正则表达式
    | 'arrLength'; // 自定义类型 数组长度


/** 响应式动态表单的表单控件类 */
export class FormField<T> {
    /** 表单控件类型 */
    type: FormControlType;
    /** 当前表单的值 */
    value: T | undefined;
    /** 响应式表单绑定的属性 */
    key: string;
    /** 表单控件项描述 */
    label: string;
    /** 表单控件是否可用 */
    disabled: boolean;
    /** 表单控件是否只读 */
    readonly: boolean;
    /** 表单控件占位内容 */
    placeholder: string;
    /** 校验列表 */
    validatorList: ValidatorDetail[];

    /** radio 或 select，checkboxgroup 列表组 */
    options: OptionDetail[];

    /** input-number 最小值 */
    min: number;
    /** input-number 最大值 */
    max: number;
    /** input-number 单位最小值 */
    step: number;

    /** text-area 文本输入框行高配置 */
    rowsConfig: { minRows: number, maxRows: number };

    /** select 选择模式 'multiple' | 'tags' | 'default' */
    selectMode: NzSelectModeType;
    /** select 是否支持清除 */
    allowClear: boolean;

    /** 日期或时间格式  */
    format: string;
    /** 日期模式 'year' | 'month' | 'week' | 'date' */
    dateMode: NzDateMode;
    /** 日期模式 是否展示今天按钮 */
    showToday: boolean;
    /** 日期模式 是否展示此刻按钮 */
    showNow: boolean;
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
    /** 时间部分 小时间隔 */
    hourStep: number;
    /** 时间部分 分钟间隔 */
    minuteStep: number;
    /** 时间部分 秒间隔 */
    secondStep: number;
    /** 时间部分 不可选小时列表 */
    disabledHours: (() => number[]) | undefined;
    /** 时间部分 不可选分钟列表 */
    disabledMinutes: ((hour: number) => number[]) | undefined;
    /** 时间部分，不可选秒列表 */
    disabledSeconds: ((hour: number, minute: number) => number[]) | undefined;

    constructor(options: {
        type: FormControlType;
        key: string;
        value?: T | undefined;
        label: string;
        disabled?: boolean;
        readonly?: boolean;
        placeholder?: string;
        options?: OptionDetail[];
        min?: number;
        max?: number;
        step?: number;
        rowsConfig?: { minRows: number, maxRows: number },
        selectMode?: NzSelectModeType,
        allowClear?: boolean,
        format?: string;
        dateMode?: NzDateMode;
        showToday?: boolean;
        showTime?: boolean;
        showNow?: boolean;
        disabledTimeFn?: DisabledTimeFn;
        disabledDateFn?: DisabledDateFn;
        ranges?: { [key: string]: Date[] } | { [key: string]: () => Date[] };
        hourStep?: number;
        minuteStep?: number;
        secondStep?: number;
        disabledHours?: () => number[];
        disabledMinutes?: (hour: number) => number[];
        disabledSeconds?: (hour: number, minute: number) => number[];
        validatorList?: ValidatorDetail[];
    }) {
        this.type = options.type || 'inputText';
        this.key = options.key || '';
        this.label = options.label || '';
        this.value = options.value;
        this.disabled = !!options.disabled;
        this.readonly = !!options.readonly;
        this.placeholder = options.placeholder || '';
        this.options = options.options || [];
        this.min = options.min || -Infinity;
        this.max = options.max || Infinity;
        this.step = options.step || 1;
        this.rowsConfig = options.rowsConfig || { minRows: 1, maxRows: Infinity };
        this.selectMode = options.selectMode || 'default';
        this.allowClear = options.allowClear || false;
        this.format = options.format || '';
        this.dateMode = options.dateMode || 'date';
        this.showToday = options.showToday === undefined ? true : options.showToday;
        this.showNow = options.showNow === undefined ? true : options.showNow;
        this.showTime = !!options.showTime;
        this.disabledTimeFn = options.disabledTimeFn;
        this.disabledDateFn = options.disabledDateFn;
        this.ranges = options.ranges || {};
        this.hourStep = options.hourStep || 1;
        this.minuteStep = options.minuteStep || 1;
        this.secondStep = options.secondStep || 1;
        this.disabledHours = options.disabledHours;
        this.disabledMinutes = options.disabledMinutes;
        this.disabledSeconds = options.disabledSeconds;
        this.validatorList = options.validatorList || [];
    }

}

import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { OptionItem } from 'src/app/types/dynamic-form';

export const CHECKBOX_GROUP_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true
};

@Component({
  selector: 'docs-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.less'],
  providers: [CHECKBOX_GROUP_ACCESSOR]
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {

  /** 复选框组 */
  @Input() options: OptionItem[] = [];
  /** 页面绑定的勾选展示 */
  dataSource: NzCheckBoxOptionInterface[] = [];
  /** 值发生变化 */
  onChange = (_: any) => { };

  constructor() { }

  ngOnInit(): void {
    this.options.forEach(item => {
      item.disabled = !!item.disabled;
      this.dataSource.push(Object.assign(item, { checked: false, disabled: item.disabled }))
    })
  }

  /** 
   * 写入初始值（实现ControlValueAccessor接口的方法）
   * @param arr 初始值
   */
  writeValue(arr: any): void {
    if (Array.isArray(arr)) {
      arr.forEach(itemValue => {
        const valueIndex = this.dataSource.findIndex(dd => dd.value === itemValue);
        this.dataSource[valueIndex].checked = true;
      })
    }
  }

  /**
   * 设置当前控件受到改变时需要调用的方法函数（实现ControlValueAccessor接口的方法）
   * @param fn 方法
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * 设置当前控件touched时需要调用的方法函数（实现ControlValueAccessor接口的方法）
   * @param fn 方法函数
   */
  registerOnTouched(fn: any): void { }

  /**
   * 设置表单可选项（实现ControlValueAccessor接口的方法）
   * @param isDisabled 是否不可选
   */
  setDisabledState(isDisabled: boolean): void {
    this.dataSource.forEach(item => item.disabled = item.disabled || isDisabled);
  }

  /**
   * 复选框单选勾选发生变更
   * @param checkList 复选框勾选情况
   */
  changeItem(checkList: NzCheckBoxOptionInterface[]) {
    const arr: any[] = [];
    checkList.filter(item => item.checked).forEach(item => arr.push(item.value));
    this.onChange(arr);
  }

}
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { OptionItem } from 'src/app/interfaces/common/dynamic-form';

export const CHECKBOX_GROUP_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true
};

/**
 * 自定义表单控件：多选checbox组
 * 
 * example：
 *  ts：
 *   hobby = ['swin','game'];
 *   options = [{ label: '游泳', value: 'swin' }, { label: '游戏', value: 'game' }];
 *  html：
 *   <docs-checkbox-group [(ngModel)]="hobby" [options]="options"></docs-checkbox-group>
 */

@Component({
  selector: 'docs-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CHECKBOX_GROUP_ACCESSOR]
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {

  /** 复选框组 */
  @Input() options: OptionItem[] = [];
  /** 页面绑定的勾选展示 */
  dataSource: NzCheckBoxOptionInterface[] = [];
  /** 值发生变化 */
  onChange = (_: any) => { };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.options.forEach(item => {
      item.disabled = !!item.disabled;
      this.dataSource.push(Object.assign(item, { checked: false, disabled: item.disabled }))
    })
  }

  /** 
   * @description 写入初始值（实现ControlValueAccessor接口的方法）
   * @param arr 初始值
   */
  writeValue(arr: any): void {
    this.dataSource.forEach(item => item.checked = false); // 重置勾选状态
    if (Array.isArray(arr)) {
      arr.forEach(itemValue => {
        const valueIndex = this.dataSource.findIndex(dd => dd.value === itemValue);
        this.dataSource[valueIndex].checked = true;
      })
    }
    this.cdr.markForCheck();
  }

  /**
   * @description 设置当前控件受到改变时需要调用的方法函数（实现ControlValueAccessor接口）
   * @param fn 方法
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @description 设置当前控件touched时需要调用的方法函数（实现ControlValueAccessor接口）
   * @param fn 方法函数
   */
  registerOnTouched(fn: any): void { }

  /**
   * @description 设置表单可选项（实现ControlValueAccessor接口）
   * @param isDisabled 是否不可选
   */
  setDisabledState(isDisabled: boolean): void {
    this.dataSource.forEach(item => item.disabled = item.disabled || isDisabled);
  }

  /**
   * @description 复选框单选勾选发生变更
   * @param checkList 复选框勾选情况
   */
  changeItem(checkList: NzCheckBoxOptionInterface[]) {
    const arr: any[] = [];
    checkList.filter(item => item.checked).forEach(item => arr.push(item.value));
    this.onChange(arr);
  }

}

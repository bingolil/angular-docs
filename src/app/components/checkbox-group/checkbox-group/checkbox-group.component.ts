import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzCheckBoxOptionInterface } from 'ng-zorro-antd/checkbox';
import { OptionItem } from 'src/app/interfaces/common/dynamic-form';
import { ObjectUtil } from 'src/app/utils';

export const CHECKBOX_GROUP_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true,
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
  providers: [CHECKBOX_GROUP_ACCESSOR],
})
export class CheckboxGroupComponent implements ControlValueAccessor {
  /** 复选框组 */
  @Input() set options(items: OptionItem[]) {
    this.dataSource = items.map((dd) => ({
      ...dd,
      checked: false,
      disabled: !!dd.disabled,
    }));
  }
  /** 页面绑定的勾选展示 */
  dataSource: NzCheckBoxOptionInterface[] = [];
  /** 值发生变化 */
  onChange = (_: any) => {};

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * @description 写入初始值（实现ControlValueAccessor接口的方法）
   * @param arr 初始值
   */
  writeValue(arr: any): void {
    this.dataSource.forEach((item) => (item.checked = false)); // 重置勾选状态
    if (Array.isArray(arr)) {
      arr.forEach((itemValue) => {
        const i = this.dataSource.findIndex((dd) =>
          ObjectUtil.isEqual(dd.value, itemValue)
        );
        this.dataSource[i].checked = true;
      });
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
  registerOnTouched(fn: any): void {}

  /**
   * @description 设置表单可选项（实现ControlValueAccessor接口）
   * @param isDisabled 是否不可选
   */
  setDisabledState(isDisabled: boolean): void {
    this.dataSource.forEach(
      (item) => (item.disabled = item.disabled || isDisabled)
    );
  }

  /**
   * @description 复选框单选勾选发生变更
   * @param list 复选框勾选情况
   */
  changeItem(list: NzCheckBoxOptionInterface[]) {
    const arr = list.filter((dd) => dd.checked).map((dd) => dd.value);
    this.onChange(arr);
  }
}

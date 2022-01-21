import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { ValidatorItem } from 'src/app/types/dynamic-form';
import { ObjectUtil } from 'src/app/utils/object-util';
import { arrLengthValidator } from '../validator/arr-length';

@Component({
  selector: 'docs-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {

  /** 表单对象 */
  @Input() formControls: any[] = [];
  /** 表单布局 'horizontal' | 'vertical' | 'inline' */
  @Input() layout: NzFormLayoutType = 'horizontal';
  /** 展示必填星号 */
  @Input() showStar = true;
  /** label 栅格span */
  @Input() labelSpan = 6;
  /** 控件 栅格span */
  @Input() controlSpan = 12;
  /** 是否展示清空按钮 */
  @Input() showClear = false;

  /** 发送表单的值 */
  @Output() emitFormValue: EventEmitter<any> = new EventEmitter();

  /** 页面绑定的表单 */
  dynamicForm!: FormGroup;
  /** 页面绑定的必填星号Map */
  showStarMap: Map<string, boolean> = new Map();
  /** 是否为垂直水平布局 */
  get isHorizontal(): boolean {
    return this.layout === 'horizontal';
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.formControls);
    this.createForm();
  }

  /** 将控件写入表单 */
  createForm(): void {
    const group: any = {};
    this.formControls.forEach(control => {
      let isShowStar = !!control.validatorList.find((dd: ValidatorItem) => dd.type === 'required');
      isShowStar = isShowStar && this.showStar;
      this.showStarMap.set(control.key, isShowStar);
      const validatorList = control.validatorList!.map((item: ValidatorItem) => this.getValidatorFn(item));
      group[control.key] = new FormControl({ value: control.value, disabled: control.disabled }, validatorList)
    })
    this.dynamicForm = new FormGroup(group);
  }

  /**
   * 获取校验项
   * @param itemInfo 初始校验数据
   * @returns 校验项
   */
  getValidatorFn(itemInfo: ValidatorItem): ValidatorFn {
    switch (itemInfo.type) {
      case 'required':
        return Validators.required;
      case 'min':
        return Validators.min(itemInfo.value as number);
      case 'max':
        return Validators.max(itemInfo.value as number);
      case 'minLength':
        return Validators.minLength(itemInfo.value as number);
      case 'maxLength':
        return Validators.maxLength(itemInfo.value as number);
      case 'regexp':
        return Validators.pattern(itemInfo.value as RegExp);
      case 'email':
        return Validators.email;
      case 'arrLength':
        return arrLengthValidator(itemInfo.min || 0, itemInfo.max || Infinity);
      default:
        return Validators.nullValidator;
    }
  }

  /** 提交表单的值 */
  onSubmit(): void {
    const basicObj = ObjectUtil.deepCopy(this.dynamicForm.value);
    this.formControls.filter(dd => dd.type === 'inputPassowrd').forEach(item => {
      delete basicObj[item.key];
    });

    const formValue = ObjectUtil.trimSpace(basicObj); // 清理字符串前后空格

    // setValue 严格遵循表单组的结构，并整体性替换控件的值
    // patchValue 以用对象中所定义的任何属性为表单模型进行替换
    this.dynamicForm.patchValue(formValue); // setValue() 重新赋值

    console.log(this.dynamicForm.value);
    if (this.dynamicForm.invalid) { // 表单验证不通过
      Object.values(this.dynamicForm.controls).forEach(controlItem => {
        controlItem.markAsDirty();
        controlItem.updateValueAndValidity({ onlySelf: true });
      })
      return;
    }
    this.emitFormValue.emit(this.dynamicForm.value);
  }

  /** 重置表单 */
  reset(event: MouseEvent): void {
    event.preventDefault(); // 防止调用onSubmit方法
    this.dynamicForm.reset(); // 设置各个控件标记为 untouched 和 pristine 都为true
  }

}

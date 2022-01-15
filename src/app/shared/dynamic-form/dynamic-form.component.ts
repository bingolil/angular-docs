import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { FormField } from 'src/app/class/dynamic-form/form-field';
import { ValidatorDetail } from 'src/app/types/form/validator-detail';
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
  @Input() formControls: FormField<any>[] = [];
  /** 表单布局 'horizontal' | 'vertical' | 'inline' */
  @Input() layout: NzFormLayoutType = 'inline';
  /** 展示必填星号 */
  @Input() showStar = true;
  /** label 栅格span */
  @Input() labelSpan = 6;
  /** 控件 栅格span */
  @Input() controlSpan = 12;

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
      const isShowStar = !!control.validatorList.find(dd => dd.type === 'required') && this.showStar;
      this.showStarMap.set(control.key, isShowStar);
      const controlValidator = control.validatorList!.map(item => this.getValidatorFn(item));
      group[control.key] = new FormControl({ value: control.value, disabled: control.disabled }, controlValidator)
    })
    this.dynamicForm = new FormGroup(group);
  }

  /**
   * 获取校验项
   * @param itemInfo 初始校验数据
   * @returns 校验项
   */
  getValidatorFn(itemInfo: ValidatorDetail): ValidatorFn {
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
    const formValue = ObjectUtil.trimSpace(this.dynamicForm.value); // 清理字符串前后空格

    // setValue 严格遵循表单组的结构，并整体性替换控件的值
    // patchValue 以用对象中所定义的任何属性为表单模型进行替换
    this.dynamicForm.patchValue(formValue); // setValue() 重新赋值

    console.log(formValue);
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
  reset(): void {
    this.dynamicForm.reset(); // 设置各个控件标记为 untouched 和 pristine 都为true
  }

}

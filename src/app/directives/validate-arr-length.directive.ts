import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

// 自定义模板驱动表单校验指令（数组长度）
/**
 * example：
 *  <docs-checkbox-group 
 *    name="hobby" 
 *    #validateArrLength="ngModel"
 *    [validateArrLength]="{min:1}"
 *    [(ngModel)]="hobby" [options]="hobbyList"
 *  >
 */
@Directive({
  selector: '[validateArrLength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateArrLengthDirective),
      multi: true
    }
  ]
})
export class ValidateArrLengthDirective implements Validator {

  /** 数组长度指令配置 值是object时，min为数组最小长度，max为数组最大长度 */
  @Input() validateArrLength: string | { min?: number, max?: number } = '';

  constructor() { }

  /**
   * @description 实现 Validator 接口方法
   * @param control 当前控件
   * @return 校验结果
   */
  validate(control: AbstractControl): ValidationErrors | null {

    let min = 0; // 数组最小长度
    let max = Infinity; // 数组最大长度
    if ( // 存在数组最小长度配置
      typeof (this.validateArrLength) !== 'string'
      && typeof (this.validateArrLength.min) === 'number'
    ) {
      min = this.validateArrLength.min;
    }
    if ( // 存在数组最大长度配置
      typeof (this.validateArrLength) !== 'string'
      && typeof (this.validateArrLength.max) === 'number'
    ) {
      max = this.validateArrLength.max;
    }

    return getValidateResult(control, min, max);
  }

}

/** 
 * @description 自定义响应式表单验证器函数（数组长度）
 * @param min 数组最小长度
 * @param max 数组最大长度
 * @returns 验证器函数
 */
export function validateArrLengthValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return getValidateResult(control, min, max);
  }
}

/**
 * @description 获取自定义验证器校验结果
 * @param control 当前控件
 * @param min 数组最小长度
 * @param max 数组最大长度
 * @returns 校验结果
 */
const getValidateResult = (control: AbstractControl, min: number, max: number)
  : ValidationErrors | null => {
  // 表单reset()时，属性值为null（没有length属性），特殊处理
  const controlValue = control.value === null ? [] : control.value;

  if (Array.isArray(controlValue)) { // control.value.length（length属性值）
    const validateResult = controlValue.length < min || controlValue.length > max;
    return validateResult ? { validateArrLength: true } : null;
  }
  if (control.touched) { // 校验的值不是一个array，抛出错误
    console.error(`The verified data: ${control.value} is not an array type`);
    return { validateArrLength: true };
  }

  return null;
}
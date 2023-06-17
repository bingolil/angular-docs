import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';
import { TypeJudgementUtil } from '../utils';

// 自定义模板驱动表单校验指令（数组长度）
/**
 * example：
 *  <docs-checkbox-group name="hobby"
 *    [verifyLength]="{min:1}"
 *    [(ngModel)]="hobby" [options]="hobbyList"
 *  ></docs-checkbox-group>
 */
@Directive({
  selector: '[verifyLength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => VerifyLengthDirective),
      multi: true
    }
  ]
})
export class VerifyLengthDirective implements Validator {

  /** 数组长度指令配置 值是object时，min为数组最小长度，max为数组最大长度，字符串时为最小值 */
  @Input() verifyLength: string | { min?: number, max?: number; } = '';

  /**
   * @description 实现 Validator 接口方法
   * @param control 当前控件
   * @return 校验结果
   */
  validate(control: AbstractControl): ValidationErrors | null {
    let { min = 0, max = Infinity } = this.verifyLength as { min?: number, max?: number; };
    const inputMin = Number.parseInt(this.verifyLength as string);
    if (!isNaN(inputMin)) min = inputMin;
    return getValidateResult(control, min, max);
  }

}

/** 
 * @description 自定义响应式表单验证器函数（数组长度）
 * @param min 数组最小长度
 * @param max 数组最大长度
 * @returns 验证器函数
 */
export function verifyLengthValidator(min = 1, max = Infinity): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return getValidateResult(control, min, max);
  };
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

  if (TypeJudgementUtil.isArray(controlValue)) { // control.value.length（length属性值）
    if (controlValue.length < min || controlValue.length > max) return { verifyLength: true };
  }

  return null;
};

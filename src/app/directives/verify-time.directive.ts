import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[verifyTime]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => VerifyTimeDirective),
      multi: true
    }
  ]
})
export class VerifyTimeDirective implements Validator {

  /** 时间校验配置 */
  @Input() verifyTime = '';

  /**
   * @description 实现 Validator 接口方法
   * @param control 当前控件
   * @return 校验结果
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return null;
  }

}

/** 
 * @description 自定义响应式表单验证器函数（时间）
 * @returns 验证器函数
 */
export function verifyTimeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return null;
  };
}

/**
 * @description 获取自定义验证器校验结果
 * @param control 当前控件
 * @returns 校验结果
 */
const getValidateResult = (control: AbstractControl,)
  : ValidationErrors | null => {

  return null;
};

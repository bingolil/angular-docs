import { Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { DateUtil } from '../utils';

interface DisabledTimeConfig {
  /** 不可选小时列表 */
  disabledHours?: (() => number[]) | undefined;
  /** 不可选分钟列表 */
  disabledMinutes?: ((hour: number) => number[]) | undefined;
  /** 不可选秒列表 */
  disabledSeconds?: ((hour: number, minute: number) => number[]) | undefined;
}

@Directive({
  selector: '[verifyTime]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => VerifyTimeDirective),
      multi: true,
    },
  ],
})
export class VerifyTimeDirective implements Validator {
  /** 时间校验配置 */
  @Input() verifyTime!: DisabledTimeConfig;

  /**
   * @description 实现 Validator 接口方法
   * @param control 当前控件
   * @return 校验结果
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return getValidateResult(control, this.verifyTime);
  }
}

/**
 * @description 自定义响应式表单验证器函数（时间）
 * @returns 验证器函数
 */
export function verifyTimeValidator(config: DisabledTimeConfig): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return getValidateResult(control, config);
  };
}

/**
 * @description 获取自定义验证器校验结果
 * @param control 当前控件
 * @returns 校验结果
 */
const getValidateResult = (
  control: AbstractControl,
  config: DisabledTimeConfig
): ValidationErrors | null => {
  const { value } = control;
  if (!value) return null;
  const { hour, minute, second } = DateUtil.getTimeInfo(value);
  const { disabledHours, disabledMinutes, disabledSeconds } = config;
  return null;
};

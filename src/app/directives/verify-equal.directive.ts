import { Attribute, Directive, forwardRef, Input } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

// 自定义模板驱动表单校验指令（比较值example：确认密码）
/**
 * example：
 * <form #myForm="ngForm">
 *   <input name="password" verifyEqual="confirmPassword" listener type="password" [(ngModel)]="password">
 *   <input name="confirmPassword" type="password" [(ngModel)]="confirmPassword" verifyEqual="password">
 * </form>
 */
@Directive({
  selector: '[verifyEqual]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => VerifyEqualDirective),
      multi: true,
    },
  ],
})
export class VerifyEqualDirective implements Validator {
  /** 比较控件在表单中的属性名称 */
  @Input() verifyEqual = '';

  constructor(@Attribute('listener') private attrListener: string) {}

  /**
   * @description 实现 Validator 接口方法
   * @param control 当前控件
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return getValidateResult(
      control,
      this.verifyEqual,
      this.attrListener !== null
    );
  }
}

/**
 * @description 自定义响应式表单验证函数（确认密码）
 * @param confirmAttrName 比较控件在表单中的属性名称
 * @param listener 是否监听当前控件
 * @returns 验证器函数
 */
export function verifyEqualValidator(
  confirmAttrName: string,
  listener?: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return getValidateResult(control, confirmAttrName, !!listener);
  };
}

/**
 * @description 获取比较结果（比较密码）
 * @param control 当前控件
 * @param comparedAttrName 比较控件在表单中的属性名称
 * @param listener 当前控件是在监听中
 * @returns 校验结果
 */
const getValidateResult = (
  control: AbstractControl,
  comparedAttrName: string,
  listener: boolean
): ValidationErrors | null => {
  const comparedControl = control.root.get(comparedAttrName); // 被比较的目标控件
  if (!comparedControl) return null; // 被比较的控件不存在

  const isEqual = control.value === comparedControl.value;
  // 当前控件存在监听，更新目标控件（dirty状态）的值并校验
  if (listener) comparedControl.updateValueAndValidity();

  return !isEqual && !listener ? { verifyEqual: true } : null;
};

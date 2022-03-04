import { Attribute, Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

// 自定义模板驱动表单校验指令（比较值example：确认密码）
/**
 * example：
 *  <!-- 密码 -->
 *  <input 
 *    name="password"
 *    validateEqual="confirmPassword"
 *    isListen="true"
 *    type="password"
 *    [(ngModel)]="password"
 *  >
 * <!-- 确认密码 -->
 *  <input 
 *    name="confirmPassword"
 *    type="password"
 *    [(ngModel)]="confirmPassword"
 *    validateEqual="password"
    >
 */
@Directive({
  selector: '[validateEqual]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ValidateEqualDirective),
      multi: true
    }
  ]
})
export class ValidateEqualDirective implements Validator {

  /** 比较控件在表单中的属性名称 */
  @Input() validateEqual = '';
  /** 是否监听当前指令绑定的表单控件 */
  private get hasListener() {
    return this.isListen === true || this.isListen === 'true';
  }

  constructor(@Attribute('isListen') public isListen: string | boolean) { }

  /**
   * @description 实现 Validator 接口方法
   * @param control 当前控件
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return getCompareResult(control, this.validateEqual, this.hasListener);
  }

}

/**
 * @description 自定义响应式表单验证函数（确认密码）
 * @param confirmAttrName 比较控件在表单中的属性名称
 * @param hasListener 是否监听当前控件
 * @returns 验证器函数
 */
export function validateEqualValidator(confirmAttrName: string, hasListener: boolean): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return getCompareResult(control, confirmAttrName, hasListener);
  }
}

/**
 * @description 获取比较结果（比较密码）
 * @param control 当前控件
 * @param compareAttrName 比较控件在表单中的属性名称
 * @param hasListener 当前控件是否存在监听
 * @returns 校验结果
 */
const getCompareResult = (control: AbstractControl, compareAttrName: string, hasListener: boolean)
  : ValidationErrors | null => {

  const compareControl = control.root.get(compareAttrName); // 比较的目标控件
  if (!!compareControl) { // 控件存在时

    const validateResult = control.value !== compareControl?.value;
    if (hasListener) { // 当前控件存在监听，更新目标控件（dirty状态）的值并校验
      compareControl.updateValueAndValidity();
    }
    // 不存在监听 且 值不相等 且 目标控件dirty状态时展示校验错误
    return (validateResult && !hasListener && compareControl.dirty) ?
      { validateEqual: true } : null;
  }
  if (control.touched) {
    console.error(`The verified control: ${compareAttrName} does not exist`);
  }
  return null;
}

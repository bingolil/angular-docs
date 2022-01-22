import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** 
 * @description 自定义验证器函数 数组长度
 * @param min 数组最小长度
 * @param max 数组最大长度
 * @returns 验证器函数
 */
export function arrLengthValidator(min: number, max: number): ValidatorFn {

  /** 是否展示错误信息，连续校验错误时，只提示一次 */
  let showOnceError = true;

  return (control: AbstractControl): ValidationErrors | null => {
    if (Array.isArray(control.value)) {
      showOnceError = true;
      const validateResult = control.value.length < min || control.value.length > max;
      return validateResult ? { arrLength: { value: control.value } } : null;
    } else { // 数据类型不是一个数组
      if (showOnceError) {
        console.error(`Custom array length verification: ${control.value} is not an array type`);
        showOnceError = false;
      }
      return { arrLength: { value: control.value } };
    }
  }
}
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { ValidatorItem } from 'src/app/interfaces/dynamic-form';
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
  /** 表单布局 'horizontal'水平模式 | 'vertical'堆叠模式 | 'inline'内联模式 */
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
  /** 表单水平模式时，左边栅格数 */
  get leftNzSpan(): number | null {
    return this.layout === 'horizontal' ? this.labelSpan : null;
  }
  /** 表单水平模式时，右边栅格数 */
  get rightNzSpan(): number | null {
    return this.layout === 'horizontal' ? this.controlSpan : null;
  }

  constructor() { }

  ngOnInit(): void {
    // 表单初始对象（example value）：
    // controls: BasicField<any>[] = [
    //   new InpuTextField({ key: 'username', value: '', label: '姓名' }),
    //   new InputPasswordField({ key: 'passowrd', value: '', label: '密码' }),
    //   new InputNumberField({ key: 'age', value: undefined, label: '年龄' }),
    //   new TextareaField({ key: 'desc', value: '', label: '描述' })
    // ];
    console.log(this.formControls);
    this.createForm();
  }

  /** 
   * @description 将控件写入表单
   */
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
   * @description 获取校验项
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

  /** 
   * @description 提交表单的值
   */
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

  /** 
   * @description 重置表单
   * @param event 点击事件
   */
  reset(event: MouseEvent): void {
    event.preventDefault(); // 防止调用onSubmit方法
    this.dynamicForm.reset(); // 设置各个控件标记为 untouched 和 pristine 都为true
  }

}

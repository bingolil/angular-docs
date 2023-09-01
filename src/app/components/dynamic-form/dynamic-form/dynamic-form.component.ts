import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { verifyLengthValidator } from 'src/app/directives/verify-length.directive';
import { verifyEqualValidator } from 'src/app/directives/verify-equal.directive';
import { verifyDateValidator } from 'src/app/directives/verify-date.directive';
import { verifyTimeValidator } from 'src/app/directives/verify-time.directive';
import { ValidatorItem } from 'src/app/interfaces/common/dynamic-form';
import { BasicField } from 'src/app/class/components/dynamic-form';

/**
 * example 动态表单（响应式表单）:
 * ts:
 *  controls: BasicField<any>[] = [
 *    new InputTextField({ key: 'username', value: '', label: '姓名' }),
 *    new InputPasswordField({ key: 'passowrd', value: '', label: '密码' }),
 *    new InputNumberField({ key: 'age', value: undefined, label: '年龄' }),
 *    new TextareaField({ key: 'desc', value: '', label: '描述' })
 *  ]
 *
 * html:
 * <docs-dynamic-form [formControls]="controls"></docs-dynamic-form>
 *
 */
@Component({
  selector: 'docs-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnChanges, OnInit {
  /** 表单对象 BasicField<any>[] */
  @Input() formControls: any[] = [];
  /** 表单布局 'horizontal'水平模式 | 'vertical'堆叠模式 | 'inline'内联模式 */
  @Input() layout: NzFormLayoutType = 'horizontal';
  /** 展示必填星号 */
  @Input() showStar = true;
  /** label 栅格span */
  @Input() labelSpan = 6;
  /** 控件 栅格span */
  @Input() controlSpan = 12;
  /** 是否展示重置按钮 */
  @Input() showReset = false;
  /** 当前动态表单是否用于查询 */
  @Input() isSearch = false;

  /** 发送表单的值 */
  @Output() emitFormValue: EventEmitter<any> = new EventEmitter();
  /** 数据发生改变，通知父组件，父组件可能修改校验 */
  @Output() valueChanges: EventEmitter<{ key: string; value: string }> =
    new EventEmitter();

  /** 页面绑定的表单 */
  dynamicForm!: UntypedFormGroup;
  /** 页面绑定的必填星号Obj */
  showStarObj: { [key: string]: boolean } = {};
  /** 表单水平模式时，左边栅格数 */
  get leftNzSpan(): number | null {
    return this.layout === 'horizontal' ? this.labelSpan : null;
  }
  /** 表单水平模式时，右边栅格数 */
  get rightNzSpan(): number | null {
    return this.layout === 'horizontal' ? this.controlSpan : null;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formControls && !changes.formControls.firstChange)
      this.createForm();
  }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * @description 将控件写入表单
   */
  createForm(): void {
    this.showStarObj = {};
    const group: any = {};
    this.formControls.forEach((control) => {
      const { value, key, disabled, validators } = control as BasicField<any>;
      const hasStar =
        this.showStar &&
        new Set(validators?.map((d) => d.type)).has('required');
      this.showStarObj[key] = hasStar;
      const list = validators?.map((d: ValidatorItem) =>
        this.getValidatorFn(d)
      );
      group[control.key] = new UntypedFormControl({ value, disabled }, list);
    });
    this.dynamicForm = new UntypedFormGroup(group);
    this.formControls.forEach(({ key }) => {
      const control = this.dynamicForm.get(key);
      control?.valueChanges.subscribe((value) =>
        this.valueChanges.emit({ key, value })
      );
    });
  }

  /**
   * @description 获取校验项
   * @param itemInfo 初始校验数据
   * @returns 校验项
   */
  getValidatorFn(itemInfo: ValidatorItem): ValidatorFn {
    const { min, max, listener, comparedControl } = itemInfo;
    switch (itemInfo.type) {
      case 'required':
        return Validators.required;
      case 'min':
        return Validators.min(itemInfo.value as number);
      case 'max':
        return Validators.max(itemInfo.value as number);
      case 'minlength':
        return Validators.minLength(itemInfo.value as number);
      case 'maxlength':
        return Validators.maxLength(itemInfo.value as number);
      case 'pattern':
        return Validators.pattern(itemInfo.value as RegExp);
      case 'email':
        return Validators.email;
      case 'verifyLength':
        return verifyLengthValidator(min || 0, max || Infinity);
      case 'verifyEqual':
        return verifyEqualValidator(comparedControl || '', listener);
      case 'verifyDate':
        return verifyDateValidator();
      case 'verifyTime':
        return verifyTimeValidator({});
      default:
        return Validators.nullValidator;
    }
  }

  /**
   * @description 提交表单的值
   */
  onSubmit(): void {
    this.dynamicForm.markAllAsTouched();
    Object.values(this.dynamicForm.controls).forEach((dd) =>
      dd.updateValueAndValidity({ onlySelf: true })
    );
    if (this.dynamicForm.invalid) return; // 表单验证不通过
    this.emitFormValue.emit(this.dynamicForm.value);
  }

  /**
   * @description 控件添加校验
   * @param key 控件key
   * @param i 插入控件校验列表的下标位置，用于UI校验信息提示
   * @param validator 校验参数
   */
  addControlValidator(key: string, i: number, validator: ValidatorItem): void {
    const currentValidator = this.getValidatorFn(validator);
    if (!this.dynamicForm.get(key)?.hasValidator(currentValidator)) {
      // 已有校验没有当前校验时，写入校验
      this.formControls.forEach((dd) => {
        if (dd.key === key) dd.validatorList.splice(i, 0, validator);
      });
      this.dynamicForm.get(key)?.addValidators(currentValidator);
    }
    this.updateControlValidity(key);
  }

  /**
   * @description 控件添移除校验
   * @param key 控件key
   * @param validator 校验参数
   */
  removeControlValidator(key: string, validator: ValidatorItem): void {
    const currentValidator = this.getValidatorFn(validator);
    this.dynamicForm.get(key)?.removeValidators(currentValidator);
    this.formControls.forEach((dd) => {
      const i = dd.validatorList.findIndex(
        (kk: ValidatorItem) => kk.type === validator.type
      );
      if (dd.key === key && i !== -1) dd.validatorList.splice(i, 1);
    });
    this.updateControlValidity(key);
  }

  /**
   * @description 更新控件校验和页面
   * @param key 控件key
   */
  updateControlValidity(key: string) {
    const hasStar =
      !!this.dynamicForm.get(key)?.hasValidator(Validators.required) &&
      this.showStar;
    this.showStarObj[key] = hasStar;
    this.dynamicForm.get(key)?.updateValueAndValidity();
  }

  /**
   * @description 重置表单
   * @param event 点击事件
   */
  reset(event: MouseEvent): void {
    event.preventDefault(); // 防止调用onSubmit方法
    this.dynamicForm.reset(); // 设置各个控件标记为 untouched 和 pristine 都为true
  }

  /**
   * @description 展示校验结果信息msg
   * @param control 当前控件
   * @param validators 当前控件的校验信息
   * @returns 校验结果信息
   */
  controlErrorMsg(
    control: AbstractControl,
    validators: ValidatorItem[]
  ): string {
    const invalidItem = validators.find((d) => control.hasError(d.type));
    return '' || (invalidItem?.msg as string);
  }
}

import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import {
  CheckboxGroupField,
  DateField,
  InputNumberField,
  InputPasswordField,
  InputTextField,
  RadioGroupField,
  SelectDropdownField,
  TextareaField,
  TimeField,
} from 'src/app/class/components/dynamic-form';
import { ValidatorItem } from 'src/app/interfaces/common/dynamic-form';
import { CheckboxGroupModule } from '../../checkbox-group/checkbox-group.module';
import { DynamicFormComponent } from './dynamic-form.component';

describe('DynamicFormComponent Test', () => {
  let fixture: ComponentFixture<DynamicFormComponent>;
  let component: DynamicFormComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        NoopAnimationsModule,
        CheckboxGroupModule,
        TranslateModule.forRoot({}),
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzInputNumberModule,
        NzRadioModule,
        NzSelectModule,
        NzDatePickerModule,
        NzTimePickerModule,
      ],
      declarations: [DynamicFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.formControls = [
      new InputTextField({
        key: 'username',
        value: null,
        label: '姓名',
        validators: [
          { type: 'pattern', msg: 'abc为开头', value: /^abc/ },
          { type: 'minlength', msg: '长度最小为4', value: 4 },
          { type: 'maxlength', msg: '长度最大为8', value: 8 },
        ],
      }),
      new InputTextField({
        key: 'email',
        value: null,
        label: '邮箱',
        validators: [{ type: 'email', msg: '正确的邮件格式' }],
      }),
      new InputPasswordField({
        key: 'password',
        value: null,
        label: '密码',
        validators: [
          {
            type: 'verifyEqual',
            comparedControl: 'confirmPassword',
            listener: true,
            msg: '',
          },
        ],
      }),
      new InputPasswordField({
        key: 'confirmPassword',
        value: null,
        label: '确认密码',
        validators: [
          {
            type: 'verifyEqual',
            comparedControl: 'password',
            msg: '两次密码不一致',
          },
        ],
      }),
      new InputNumberField({
        key: 'age',
        value: null,
        label: '年龄',
        validators: [
          { type: 'min', msg: '不能小于20岁', value: 20 },
          { type: 'max', msg: '不能大于40岁', value: 40 },
        ],
      }),
      new SelectDropdownField({
        key: 'sex',
        value: null,
        label: '性别',
        options: [
          { label: '男', value: 'male' },
          { label: '女', value: 'female' },
        ],
        validators: [{ type: 'required', msg: 'dddd' }],
      }),
      new DateField({ key: 'birthDate', value: null, label: '出生日期' }),
      new TimeField({ key: 'getUpTime', value: null, label: '起床时间' }),
      new RadioGroupField({
        key: 'adult',
        value: null,
        label: '成年',
        options: [
          { label: '是', value: 'Y' },
          { label: '否', value: 'N' },
        ],
      }),
      new CheckboxGroupField({
        key: 'fav',
        value: null,
        label: '爱好',
        options: [
          { label: '游泳', value: 'swin' },
          { label: '游戏', value: 'game' },
          { label: '阅读', value: 'read' },
        ],
        validators: [
          { type: 'verifyLength', msg: '只能选择1-2个爱好', min: 1, max: 2 },
        ],
      }),
      new TextareaField({ key: 'evaluate', value: null, label: '评价' }),
    ];
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('leftNzSpan value and rightNzSpan value', () => {
    component.layout = 'inline';
    component.labelSpan = 6;
    component.controlSpan = 12;
    expect(component.leftNzSpan).toEqual(null);
    expect(component.rightNzSpan).toEqual(null);
    component.layout = 'horizontal';
    expect(component.leftNzSpan).toEqual(6);
    expect(component.rightNzSpan).toEqual(12);
  });

  it('createForm function', () => {
    expect(component.showStarObj['username']).toEqual(false);
    expect(component.showStarObj['sex']).toEqual(true);
    expect(
      component.dynamicForm.get('sex')?.hasValidator(Validators.required)
    ).toEqual(true);
    const createFormSpy = jest.spyOn(component, 'createForm');
    component.formControls = [
      new InputTextField({ key: 'description', value: null, label: '描述' }),
    ];
    component.ngOnChanges({
      formControls: { firstChange: false },
    } as unknown as SimpleChanges);
    expect(createFormSpy).toHaveBeenCalled();
    expect(component.showStarObj['username']).toEqual(undefined);
    expect(component.showStarObj['description']).toEqual(false);
  });

  it('valueChanges eimt value', () => {
    const valueChangesEmitSpy = jest.spyOn(component.valueChanges, 'emit');
    component.dynamicForm.patchValue({ username: 'username' });
    expect(valueChangesEmitSpy).toHaveBeenCalled();
    expect(valueChangesEmitSpy).toHaveBeenCalledWith({
      key: 'username',
      value: 'username',
    });
    component.dynamicForm.patchValue({ age: 18 });
    expect(valueChangesEmitSpy).toHaveBeenCalled();
    expect(valueChangesEmitSpy).toHaveBeenCalledWith({ key: 'age', value: 18 });
  });

  it('onSubmit function', () => {
    const formValueEmitSpy = jest.spyOn(component.emitFormValue, 'emit');
    expect(component.dynamicForm.get('username')?.touched).toEqual(false);
    expect(component.dynamicForm.valid).toEqual(false);
    expect(component.onSubmit()).toEqual(undefined);
    component.dynamicForm.patchValue({ sex: 'male', fav: ['swin'] });
    expect(component.dynamicForm.valid).toEqual(true);
    component.onSubmit();
    expect(component.dynamicForm.get('username')?.touched).toEqual(true);
    expect(formValueEmitSpy).toHaveBeenCalled();
  });

  it('addControlValidator or addControlValidator function', () => {
    expect(
      component.dynamicForm.get('evaluate')?.hasValidator(Validators.required)
    ).toEqual(false);
    const addFn = (control: AbstractControl) =>
      control.addValidators(Validators.required);
    component.addControlValidator('evaluate', 0, { type: 'required', msg: '' });
    expect(
      component.dynamicForm.get('evaluate')?.hasValidator(Validators.required)
    ).toEqual(true);
    expect(component.showStarObj['evaluate']).toEqual(true);
    const removeFn = (control: AbstractControl) =>
      control.removeValidators(Validators.required);
    component.removeControlValidator('evaluate', { type: 'required', msg: '' });
    expect(
      component.dynamicForm.get('evaluate')?.hasValidator(Validators.required)
    ).toEqual(false);
  });

  it('reset function', () => {
    const usernameControl = component.dynamicForm.get('username');
    component.dynamicForm.patchValue({ username: 'username' });
    component.onSubmit();
    expect(usernameControl?.value).toEqual('username');
    const preventDefaultSpy = jest.fn();
    const event = {
      preventDefault: preventDefaultSpy,
    } as unknown as MouseEvent;
    component.reset(event);
    expect(preventDefaultSpy).toHaveBeenCalled();
    expect(usernameControl?.value).toEqual(null);
  });

  it('controlErrorMsg function', () => {
    const control = component.dynamicForm.get('username');
    const list: ValidatorItem[] = [
      { type: 'pattern', msg: 'abc为开头', value: /^abc/ },
      { type: 'minlength', msg: '长度最小为4', value: 4 },
      { type: 'maxlength', msg: '长度最大为8', value: 8 },
    ];
    let result = component.controlErrorMsg(control!, list);
    expect(result).toEqual(undefined);
    component.dynamicForm.patchValue({ username: '123' });
    result = component.controlErrorMsg(control!, list);
    expect(result).toEqual('abc为开头');
    component.dynamicForm.patchValue({ username: 'abc' });
    result = component.controlErrorMsg(control!, list);
    expect(result).toEqual('长度最小为4');
    component.dynamicForm.patchValue({ username: 'abc5698sdadaaa' });
    result = component.controlErrorMsg(control!, list);
    expect(result).toEqual('长度最大为8');
  });
});

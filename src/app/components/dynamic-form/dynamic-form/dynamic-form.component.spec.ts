import { SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { CheckboxGroupField, DateField, InputNumberField, InputPasswordField, InputTextField, RadioGroupField, SelectDropdownField, TextareaField, TimeField } from 'src/app/class/components/dynamic-form';
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
        NzTimePickerModule
      ],
      declarations: [DynamicFormComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    component.formControls = [
      new InputTextField({
        key: 'username', value: null, label: '姓名',
        validatorList: [
          { type: 'pattern', msg: 'abc为开头', value: /^abc/ },
          { type: 'minlength', msg: '长度最小为4', value: 4 },
          { type: 'maxlength', msg: '长度最大为8', value: 8 },
        ]
      }),
      new InputTextField({
        key: 'email', value: null, label: '邮箱',
        validatorList: [{ type: 'email', msg: '正确的邮件格式' }]
      }),
      new InputPasswordField({
        key: 'password', value: null, label: '密码',
        validatorList: [{ type: 'verifyEqual', comparedControl: 'confirmPassword', listener: true, msg: '' }]
      }),
      new InputPasswordField({
        key: 'confirmPassword', value: null, label: '确认密码',
        validatorList: [{ type: 'verifyEqual', comparedControl: 'password', msg: '两次密码不一致' }]
      }),
      new InputNumberField({ key: 'age', value: null, label: '年龄' }),
      new SelectDropdownField({
        key: 'sex', value: null, label: '性别',
        options: [{ label: '男', value: 'male' }, { label: '女', value: 'female' }],
        validatorList: [{ type: 'required', msg: 'dddd' }]
      }),
      new DateField({ key: 'birthDate', value: null, label: '出生日期' }),
      new TimeField({ key: 'getUpTime', value: null, label: '起床时间' }),
      new RadioGroupField({ key: 'adult', value: null, label: '成年' }),
      new CheckboxGroupField({
        key: 'fav', value: null, label: '爱好',
        options: [{ label: '游泳', value: 'swin' }, { label: '游戏', value: 'game' }, { label: '阅读', value: 'read' }],
        validatorList: [{ type: 'verifyLength', msg: '只能选择1-2个爱好', min: 1, max: 2 }]
      }),
      new TextareaField({ key: 'evaluate', value: null, label: '评价' })
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
    expect(component.dynamicForm.get('sex')?.hasValidator(Validators.required)).toEqual(true);
    const createFormSpy = jest.spyOn(component, 'createForm');
    component.formControls = [new InputTextField({ key: 'description', value: null, label: '描述' })];
    component.ngOnChanges({ formControls: { firstChange: false } } as unknown as SimpleChanges);
    expect(createFormSpy).toHaveBeenCalled();
    expect(component.showStarObj['username']).toEqual(undefined);
    expect(component.showStarObj['description']).toEqual(false);
  });

  it('valueChanges eimt value', () => {
    const valueChangesEmitSpy = jest.spyOn(component.valueChanges, 'emit');
    component.dynamicForm.patchValue({ username: 'username' });
    expect(valueChangesEmitSpy).toHaveBeenCalled();
    expect(valueChangesEmitSpy).toHaveBeenCalledWith({ key: 'username', value: 'username' });
    component.dynamicForm.patchValue({ age: 18 });
    expect(valueChangesEmitSpy).toHaveBeenCalled();
    expect(valueChangesEmitSpy).toHaveBeenCalledWith({ key: 'age', value: 18 });
  });

  it('onSubmit function', () => {

  });

  it('setControlValidator function', () => {
    expect(component.dynamicForm.get('evaluate')?.hasValidator(Validators.required)).toEqual(false);
    const addFn = (control: FormControl) => control.addValidators(Validators.required);
    component.setControlValidator('evaluate', addFn);
    expect(component.dynamicForm.get('evaluate')?.hasValidator(Validators.required)).toEqual(true);
    expect(component.showStarObj['evaluate']).toEqual(true);
    const removeFn = (control: FormControl) => control.removeValidators(Validators.required);
    component.setControlValidator('evaluate', removeFn);
    expect(component.dynamicForm.get('evaluate')?.hasValidator(Validators.required)).toEqual(false);
  });

  it('reset function', () => {

  });

});

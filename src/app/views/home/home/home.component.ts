import { Component, OnInit } from '@angular/core';
import { BasicField, CheckboxGroupField, DateField, InputNumberField, InputPasswordField, InputTextField, RadioGroupField, SelectDropdownField, TextareaField, TimeField } from 'src/app/class/components/dynamic-form';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  controls: BasicField<any>[] = [
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

  constructor() { }

  ngOnInit(): void { }

  handleValueChanges(event: any) {
    console.log(event);
  }

}

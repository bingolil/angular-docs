import { Component, OnInit } from '@angular/core';
import { differenceInCalendarDays } from 'date-fns';
import { BasicField, CheckboxGroupField, DateField, DateRangeField, InpuTextField, InputNumberField, InputPasswordField, RadioGroupField, SelectDropdownField, TextareaField, TimeField } from 'src/app/class/dynamic-form';

@Component({
  selector: 'docs-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  controls: BasicField<any>[] = [
    new InpuTextField({ key: 'username', value: '', label: '姓名' }),
    new InputPasswordField({ key: 'passowrd', value: '', label: '密码' }),
    new InputNumberField({ key: 'age', value: undefined, label: '年龄' }),
    new TextareaField({ key: 'desc', value: '', label: '描述' }),
    new SelectDropdownField(
      {
        key: 'sex', value: undefined, label: '性别', options: [
          { label: '男', value: '1' }, { label: '女', value: '2' }
        ]
      }
    ),
    new SelectDropdownField(
      {
        key: 'fav', value: ['xq', 'dy'], label: '爱好', mode: 'multiple', options: [
          { label: '钓鱼', value: 'dy' }, { label: '下棋', value: 'xq' }, { label: '赛车', value: 'sz' }
        ]
      }
    ),
    new CheckboxGroupField({
      key: 'oral', value: [], label: '口语', options: [
        { label: '英语', value: 'yy' }, { label: '西班牙语', value: 'xby' }
      ]
    }),
    new DateField({ key: 'birthDay', value: new Date(), label: '出生日期', showTime: true }),
    new TimeField({ key: 'upTime', value: new Date(), label: '起床时间' }),
    new RadioGroupField({
      key: 'nationality', value: undefined, label: '国籍', options: [
        { label: '中国', value: 'China' }, { label: '美国', value: 'American' }
      ]
    }),
    new DateRangeField({ key: 'highSchool', value: [], placeholder: ['开始时间', '结束时间'], label: '高中时期', mode: 'date', disabledDateFn: (current: Date): boolean => differenceInCalendarDays(current, new Date()) > 0 })
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

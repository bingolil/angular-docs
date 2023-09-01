import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxGroupModule } from '../components';
import {
  VerifyLengthDirective,
  verifyLengthValidator,
} from './verify-length.directive';

@Component({
  selector: 'docs-test',
  template: `
    <form #myForm="ngForm">
      <docs-checkbox-group
        name="hobby"
        verifyLength="1"
        [(ngModel)]="hobby"
        [options]="hobbyList"
      ></docs-checkbox-group>
      <docs-checkbox-group
        name="ages"
        [verifyLength]="{ min: 2, max: 3 }"
        [(ngModel)]="ages"
        [options]="ageList"
      ></docs-checkbox-group>
    </form>
    <!-- ==================================== -->
    <div [formGroup]="userForm">
      <docs-checkbox-group
        name="hobby"
        formControlName="hobby"
        [options]="hobbyList"
      ></docs-checkbox-group>
      <docs-checkbox-group
        formControlName="ages"
        [options]="ageList"
      ></docs-checkbox-group>
    </div>
  `,
})
export class TestComponent {
  @ViewChild('myForm') myForm!: NgForm;

  hobbyList = [
    { label: '游泳', value: 'swin' },
    { label: '游戏', value: 'game' },
    { label: '阅读', value: 'read' },
  ];
  ageList = [
    { label: '21', value: '21' },
    { label: '22', value: '22' },
    { label: '25', value: '25' },
    { label: '26', value: '26' },
    { label: '23', value: '23' },
  ];
  hobby: string[] = [];
  ages: string[] = [];

  userForm: FormGroup<any> = new FormGroup({
    hobby: new FormControl(null, [verifyLengthValidator()]),
    ages: new FormControl(null, [verifyLengthValidator(2, 3)]),
  });

  constructor(public ele: ElementRef) {}
}

describe('VerifyLengthDirective Test', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CheckboxGroupModule],
      declarations: [TestComponent, VerifyLengthDirective],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('FormsModule control status', () => {
    const hobbyControl = component.myForm.controls['hobby'];
    expect(hobbyControl.valid).toEqual(false);
    component.myForm.setValue({ hobby: ['swin'], ages: [] });
    expect(hobbyControl.valid).toEqual(true);

    const agesControl = component.myForm.controls['ages'];
    expect(agesControl.valid).toEqual(false);
    component.myForm.setValue({ ages: ['21'], hobby: [] });
    expect(agesControl.valid).toEqual(false);
    expect(agesControl.errors).toEqual({ verifyLength: true });
    component.myForm.setValue({ ages: ['21', '22'], hobby: [] });
    expect(agesControl.valid).toEqual(true);
    component.myForm.setValue({ ages: ['21', '22', '23', '25'], hobby: [] });
    expect(agesControl.errors).toEqual({ verifyLength: true });
    expect(agesControl.valid).toEqual(false);
  });

  it('ReactiveFormsModule control status', () => {
    const hobbyControl = component.userForm.controls['hobby'];
    expect(hobbyControl.valid).toEqual(true);
    component.userForm.setValue({ hobby: ['swin'], ages: [] });
    expect(hobbyControl.valid).toEqual(true);

    const agesControl = component.userForm.controls['ages'];
    expect(agesControl.valid).toEqual(false);
    component.userForm.patchValue({ ages: ['21'] });
    expect(agesControl.valid).toEqual(false);
    expect(agesControl.errors).toEqual({ verifyLength: true });
    component.userForm.patchValue({ ages: ['21', '22'] });
    expect(agesControl.valid).toEqual(true);
    component.userForm.patchValue({ ages: ['21', '22', '23', '25'] });
    expect(agesControl.errors).toEqual({ verifyLength: true });
    expect(agesControl.valid).toEqual(false);
  });
});

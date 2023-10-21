import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  verifyEqualValidator,
  VerifyEqualDirective,
} from './verify-equal.directive';

@Component({
  selector: 'docs-test',
  template: `
    <form #myForm="ngForm">
      <input
        name="password"
        id="password"
        verifyEqual="confirmPassword"
        listener="true"
        type="password"
        [(ngModel)]="password"
      />
      <input
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        [(ngModel)]="confirmPassword"
        verifyEqual="password"
      />
    </form>
    <!-- ==================================== -->
    <div [formGroup]="userForm">
      <input
        name="password"
        type="password"
        id="userPassword"
        formControlName="password"
      />
      <input
        name="confirmPassword"
        id="confirmPassword"
        type="password"
        id="userConfirmPassword"
        formControlName="confirmPassword"
      />
    </div>
  `,
})
export class TestComponent {
  @ViewChild('myForm') myForm!: NgForm;

  password = '';
  confirmPassword = '';

  userForm = new FormGroup({
    password: new FormControl('', [
      verifyEqualValidator('confirmPassword', true),
    ]),
    confirmPassword: new FormControl('', [verifyEqualValidator('password')]),
  });

  constructor(public ele: ElementRef) {}
}

describe('VerifyEqualDirective Test', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [TestComponent, VerifyEqualDirective],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('FormsModule control status', () => {
    const passwordEle = debugElement.query(By.css('#password')).nativeElement;
    passwordEle.value = 'password';
    passwordEle.dispatchEvent(new Event('input'));
    expect(component.myForm.controls['confirmPassword']?.valid).toEqual(false);
    expect(component.myForm.controls['confirmPassword']?.errors).toEqual({
      verifyEqual: true,
    });
    expect(component.myForm.controls['password']?.valid).toEqual(true);
    const confirmPasswordEle = debugElement.query(
      By.css('#confirmPassword')
    ).nativeElement;
    confirmPasswordEle.value = 'password';
    confirmPasswordEle.dispatchEvent(new Event('input'));
    expect(component.myForm.controls['confirmPassword']?.valid).toEqual(true);
  });

  it('ReactiveFormsModule control status', () => {
    const passwordEle = debugElement.query(
      By.css('#userPassword')
    ).nativeElement;
    passwordEle.value = 'password';
    passwordEle.dispatchEvent(new Event('input'));
    expect(component.userForm.controls['confirmPassword']?.valid).toEqual(
      false
    );
    expect(component.userForm.controls['password']?.valid).toEqual(true);
    const confirmPasswordEle = debugElement.query(
      By.css('#userConfirmPassword')
    ).nativeElement;
    confirmPasswordEle.value = 'password';
    confirmPasswordEle.dispatchEvent(new Event('input'));
    expect(component.userForm.controls['confirmPassword']?.valid).toEqual(true);
  });
});

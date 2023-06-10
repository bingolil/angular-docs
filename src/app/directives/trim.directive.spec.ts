import { Component, DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TrimDirective } from './trim.directive';

@Component({
  selector: 'docs-test',
  template: `<input id="myInput" type="text" trim [(ngModel)]="test">`
})
export class TestComponent {
  test?: string = undefined;
  constructor(public ele: ElementRef) { }
}

describe('TrimDirective Test', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [TestComponent, TrimDirective]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should trim string empty on blur', () => {
    const inputEle = debugElement.query(By.css('#myInput')).nativeElement;
    inputEle.value = '   a   ';
    inputEle.dispatchEvent(new Event('input'));
    inputEle.dispatchEvent(new Event('blur'));
    expect(component.test).toEqual('a');
  });

});

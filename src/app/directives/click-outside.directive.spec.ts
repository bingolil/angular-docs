import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClickOutsideDirective } from './click-outside.directive';

@Component({
  selector: 'docs-child',
  template: `<div id="testDiv"><div (clickOutside)="doSomething()">example</div></div>`
})
export class TestComponent {
  doSomething() { }
}

describe('ClickOutsideDirective Test', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ClickOutsideDirective]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('clickOutSide should be called', () => {
    const mockFn = jest.fn();
    component.doSomething = mockFn;
    const divEle = debugElement.query(By.css('#testDiv')).nativeElement;
    divEle.click();
    expect(mockFn).toHaveBeenCalledWith();
  });
});

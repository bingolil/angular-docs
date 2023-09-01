import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScrollFixDirective } from './scroll-fix.directive';

@Component({
  selector: 'docs-test',
  template: ` <div style="height: 1000px;">
    <div #firstDom style="height:20px;" scrollFix="20"></div>
  </div>`,
})
export class TestComponent {
  @ViewChild('firstDom') firstDom!: ElementRef;
  @ViewChild(ScrollFixDirective) scrollFixOne!: ScrollFixDirective;
}

describe('ScrollFixDirective Test', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ScrollFixDirective],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('fixed top distance', () => {
    const firstDomNode = component.firstDom.nativeElement;
    firstDomNode.getBoundingClientRect = jest.fn(() => ({
      height: 20,
      top: 100,
      width: 200,
    }));
    component.scrollFixOne.ngAfterViewInit();
    window.scrollTo(0, 80);
    window.dispatchEvent(new Event('scroll'));
    expect(component.firstDom.nativeElement.style.position).toEqual('static');
    expect(component.firstDom.nativeElement.style.zIndex).toEqual('auto');
    expect(component.firstDom.nativeElement.style.top).toEqual('');

    window.scrollTo(0, 90);
    window.dispatchEvent(new Event('scroll'));
    expect(component.firstDom.nativeElement.style.position).toEqual('fixed');
    expect(component.firstDom.nativeElement.style.zIndex).toEqual('999');
    expect(component.firstDom.nativeElement.style.top).toEqual('20px');
  });
});

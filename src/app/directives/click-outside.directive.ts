import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

// 监听当前指令绑定容器外的点击事件
/**
 * example: <div (clickOutside)="doSomething()">example</div>
 */
@Directive({
  selector: '[clickOutside]',
  standalone: false,
})
export class ClickOutsideDirective {
  /** 点击当前绑定当前容器的事件时，通知父组件 */
  @Output() clickOutside: EventEmitter<any> = new EventEmitter();
  /**
   * @description 监听document上的点击事件
   * @param targetElement 点击的事件对象
   */
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement) {
    const clickInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickInside) {
      // 未点击当前容器，发送emit
      this.clickOutside.emit();
    }
  }

  constructor(private elementRef: ElementRef) {}
}

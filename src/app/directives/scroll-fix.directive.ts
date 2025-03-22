import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

// 浏览器滚动到一定距离，固定当前指令绑定的容器在页面上的位置
// 绑定的容器上不能存在margin-top的style
/**
 * example1:
 *  <div style="height: 1000px;">
 *    <div class="bg-success" style="height: 20px;" scrollFixed></div>
 *  </div>
 *
 * example2:
 *  <div style="height: 1000px;">
 *    <div class="bg-success" style="height: 20px;" scrollFixed="20"></div>
 *  </div>
 */
@Directive({
    selector: '[scrollFixed]',
    standalone: false
})
export class ScrollFixedDirective implements AfterViewInit {
  /** 指令 当前容器固定时，到最顶部的距离 */
  @Input() scrollFixed: string | number = '';

  /** 当前容器到窗口顶部距离（非固定时距离） */
  clientTop = 0;
  /**  fixTop为固定容器时，到顶部的距离，未设置时，取0（固定到最顶部），默认单位px */
  fixTop = 0;

  /**
   * @description 监听document上的滚动事件
   * @param event 滚动事件
   */
  @HostListener('window:scroll') public onScroll() {
    const scrollTop = document.documentElement.scrollTop; // 滚动条滚动的距离

    if (scrollTop > this.clientTop - this.fixTop) {
      this.renderer2.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer2.setStyle(this.el.nativeElement, 'top', this.fixTop + 'px');
      this.renderer2.setStyle(this.el.nativeElement, 'z-index', 999);
    } else {
      this.renderer2.setStyle(this.el.nativeElement, 'position', 'static');
      this.renderer2.setStyle(this.el.nativeElement, 'top', 'auto'); // auto默认值
      this.renderer2.setStyle(this.el.nativeElement, 'z-index', 'auto');
    }
  }

  constructor(private el: ElementRef, private renderer2: Renderer2) {}

  ngAfterViewInit(): void {
    // postion fixed 需要设置当前容器宽高
    const clientWidth = this.el.nativeElement.getBoundingClientRect().width;
    this.renderer2.setStyle(this.el.nativeElement, 'width', clientWidth + 'px');
    /**
     * 容器到文档顶部距离 = clientRect().top + 网页卷去的距离
     * angular 单页面应用，当前页面存在滚动条
     * 切换路由后页面不会滚动到顶部，即 当前容器到文档顶部初始距离需要计算得出
     * this.el.nativeElement.offsetTop 与当前元素最近的经过定位(position不等于static)的父级元素
     */
    this.clientTop = this.el.nativeElement.getBoundingClientRect().top;
    this.clientTop += document.documentElement.scrollTop;
    const distance = parseInt(this.scrollFixed as string);
    if (!isNaN(distance)) this.fixTop = distance;
  }
}

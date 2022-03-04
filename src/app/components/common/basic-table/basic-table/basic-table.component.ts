import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PAGE, PAGE_SIZE_OPTIONS } from 'src/app/constant';

/** 设置表格固定列样式参数接口 */
interface SetFixParam {
  /** 固定宽度 */
  fixWidth: number;
  /** 循环的值 */
  num: number;
  /** 是否为左边 */
  isLeft: boolean;
  /** tr列表Dom */
  trListDom?: HTMLCollection;
}

/**
 * 基础表格
 * <docs-basic-table>
 *  <thead>
 *    <tr>
 *      <th>姓名</th>
 *      <th>年龄</th>
 *    </tr>
 *  </thead>
 *  <tbody>
 *    <tr>
 *      <td>jack</td>
 *      <td>18</td>
 *    </tr>
 *  </tbody>
 * </docs-basic-table>
 * 
 * 
 * */
@Component({
  selector: 'docs-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicTableComponent implements OnInit, AfterViewInit, OnDestroy {

  /** 表格数据总条数 */
  @Input() total = 0;
  /** 表格最大高度 固定头部 */
  @Input() maxHeight = 0;
  /** 左边固定的列数 */
  @Input() leftFix = 0;
  /** 右边固定的列数 */
  @Input() rightFix = 0;
  /** 当前页码 */
  @Input() pageNum = PAGE.pageNum;
  /** 当前每页展示条数 */
  @Input() pageSize = PAGE.pageSize;
  /** 是否展示分页器 */
  @Input() showPagination = true;
  /** 是否展示每页展示多少条数列表 */
  @Input() showPageSizeChange = false;
  /** 是否展示总条数数据 */
  @Input() showTotal = true;
  /** 页码或页面尺寸发生变更，请求数据发生器 */
  @Output() pageChange: EventEmitter<{ pageNum: number, pageSize: number }> = new EventEmitter();
  /** 表格视图 */
  @ViewChild('dataTable', { static: true }) dataTable!: ElementRef<HTMLTableElement>;

  /** 监听滚动订阅 */
  scrollSub!: Subscription;
  /** 展示的分页数 */
  pageSizeOptions = PAGE_SIZE_OPTIONS;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.maxHeight) { // 表格存在高度，固定表头
      this.renderer.addClass(this.dataTable.nativeElement.querySelector('thead'), 'fix-head');
    }

    if (this.leftFix > 0 || this.rightFix > 0) { // 表格左边或右边存在固定列
      this.resetTableStyle();

      const tableWrapDiv = document.getElementById('table-wrap')!;
      this.scrollSub = fromEvent(tableWrapDiv, 'scroll').pipe(
        debounceTime(20) // 降低dom操作
      ).subscribe(() => {
        this.resetTableShadow();
      })
    }
  }

  ngOnDestroy(): void {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
    }
  }

  /**
  * @description ng-content发生变化时调用
  * @param event MutationRecord 变化的内容（ui中为$event）
  */
  onContentChange() {
    console.log('ng-content changes....');
    this.resetTableStyle();
  }

  /** 
   * @description 重置表格样式，存在固定列时，添加样式类  sticky
   */
  resetTableStyle() {
    const theadTrList = this.dataTable.nativeElement.querySelector('thead')?.children;
    const tbodyTrList = this.dataTable.nativeElement.querySelector('tbody')?.children

    let leftWidth = 0; // 左边固定td宽度
    for (let i = 0; i < this.leftFix; i++) { // 添加左边固定样式类
      let param: SetFixParam = {
        fixWidth: leftWidth,
        isLeft: true,
        num: i,
        trListDom: theadTrList
      };
      const thWidth = this.setFixStyle(param);
      param.trListDom = tbodyTrList;
      const tdWidth = this.setFixStyle(param);
      leftWidth += (thWidth || tdWidth);
    }

    let rightWidth = 0; // 右边固定td宽度
    for (let j = 0; j < this.rightFix; j++) { // 添加右边固定样式类
      let param: SetFixParam = {
        fixWidth: rightWidth,
        isLeft: false,
        num: j,
        trListDom: theadTrList
      };
      const thWidth = this.setFixStyle(param);
      param.trListDom = tbodyTrList;
      const tdWidth = this.setFixStyle(param);
      rightWidth += (thWidth || tdWidth);
    }
    this.resetTableShadow();
  }

  /**
   * @description 设置表格固定列
   * @param param 设置参数
   * @returns 当前固定列宽度
   */
  setFixStyle(param: SetFixParam): number {
    let width = 0;
    if (param.trListDom) {
      for (let mm = 0; mm < param.trListDom.length; mm++) {
        let tdDom = param.trListDom.item(mm)?.children[param.num];
        if (!param.isLeft) { // 右边固定时，重新选取tdDom
          const tdCollection = param.trListDom.item(mm)?.children as HTMLCollection;
          tdDom = tdCollection[tdCollection.length - param.num - 1]; // Element
        }
        if (!width) {
          width = tdDom?.getBoundingClientRect().width || 0;
        }
        this.renderer.addClass(tdDom, 'sticky');
        this.renderer.setStyle(tdDom, 'z-index', 100);
        const attrStr = param.isLeft ? 'left' : 'right';
        this.renderer.setStyle(tdDom, attrStr, param.fixWidth + 'px');
      }
    }
    return width;
  }

  /** 
   * @description 重置固定列阴影
   */
  resetTableShadow() {
    const theadTrList = this.dataTable.nativeElement.querySelector('thead')?.children;
    const tbodyTrList = this.dataTable.nativeElement.querySelector('tbody')?.children;

    if (this.leftFix > 0) { // 处理左边阴影
      const isAddClass = document.getElementById('table-wrap')!.scrollLeft > 0;
      this.setBoxShadow(isAddClass, true, theadTrList);
      this.setBoxShadow(isAddClass, true, tbodyTrList);
    }

    if (this.rightFix > 0) { // 处理右边阴影
      const tableWrapDiv = document.getElementById('table-wrap');
      const tableWidth = this.dataTable.nativeElement.getBoundingClientRect().width;
      const tableWrapWidth = tableWrapDiv!.getBoundingClientRect().width;
      const tableWrapScrollLeft = tableWrapDiv!.scrollLeft;
      const isAddClass = tableWrapScrollLeft + tableWrapWidth < tableWidth - 1;
      this.setBoxShadow(isAddClass, false, theadTrList);
      this.setBoxShadow(isAddClass, false, tbodyTrList);
    }
  }

  /**
   * @description 设置固定阴影
   * @param isAddClass 是否添加样式类 true添加，false移除
   * @param isLeft true为左边，false为右边
   * @param trListDom tr列表
   */
  setBoxShadow(isAddClass: boolean, isLeft: boolean, trListDom?: HTMLCollection): void {
    if (trListDom) {
      for (let kk = 0; kk < trListDom.length; kk++) {
        let tdDom = trListDom.item(kk)?.children[this.leftFix - 1];
        if (!isLeft) { // 右边固定时，重新选取tdDom节点
          const tdListDom = trListDom.item(kk)?.children as HTMLCollection;
          tdDom = tdListDom[tdListDom?.length - this.rightFix];
        }
        const className = isLeft ? 'left-box-shadow' : 'right-box-shadow'
        if (isAddClass) {
          this.renderer.addClass(tdDom, className);
        } else {
          this.renderer.removeClass(tdDom, className);
        }
      }
    }
  }

  /**
   * @description 页码发生改变
   * @param pageNum 页码
   */
  pageNumChange(pageNum: number) {
    const params = { pageSize: this.pageSize, pageNum: pageNum };
    this.pageChange.emit(params);
  }

  /**
   * @description 每页展示条数发生改变
   * @param pageSize 每页展示条数
   */
  pageSizeChange(pageSize: number) {
    const params = { pageSize: pageSize, pageNum: this.pageNum };
    this.pageChange.emit(params);
  }

}

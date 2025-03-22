import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { LoadingService } from 'src/app/services/base/loading.service';

// http请求动画ui
@Component({
    selector: 'docs-loading-ui',
    templateUrl: './loading-ui.component.html',
    styleUrls: ['./loading-ui.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class LoadingUiComponent implements OnInit {
  /** 是否展示loading动画 */
  loading = false;

  constructor(
    private loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
      this.cdr.markForCheck();
    });
  }
}

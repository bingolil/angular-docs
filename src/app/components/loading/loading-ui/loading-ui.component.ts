import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'docs-loading-ui',
  templateUrl: './loading-ui.component.html',
  styleUrls: ['./loading-ui.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

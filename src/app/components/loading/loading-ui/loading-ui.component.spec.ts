import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { LoadingService } from 'src/app/services/base';
import { LoadingUIComponent } from './loading-ui.component';

describe('LoadingUiComponent Test', () => {
  let fixture: ComponentFixture<LoadingUIComponent>;
  let component: LoadingUIComponent;
  let element: any;
  let loadingService: LoadingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingUIComponent],
      providers: [LoadingService],
    }).compileComponents();
    fixture = TestBed.createComponent(LoadingUIComponent);
    loadingService = TestBed.inject(LoadingService)!;
    component = fixture.componentInstance;
    element = fixture.nativeElement;
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('loadingService loading$ next vlaue', fakeAsync(() => {
    component.ngOnInit();
    loadingService.loading$.next(true);
    tick();
    expect(component.loading).toEqual(true);

    loadingService.loading$.next(false);
    tick();
    expect(component.loading).toEqual(false);
  }));
});

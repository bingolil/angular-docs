import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LoadingService } from 'src/app/services/base';
import { LoadingUiComponent } from './loading-ui.component';

describe('LoadingUiComponent Test', () => {
  let fixture: ComponentFixture<LoadingUiComponent>;
  let component: LoadingUiComponent;
  let element: any;
  let loadingService: LoadingService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingUiComponent],
      providers: [LoadingService]
    }).compileComponents();
    fixture = TestBed.createComponent(LoadingUiComponent);
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

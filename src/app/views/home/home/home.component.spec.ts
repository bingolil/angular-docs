import { TestBed } from '@angular/core/testing';
import { DynamicFormModule } from 'src/app/components';
import { HomeComponent } from './home.component';

describe('HomeComponent Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DynamicFormModule],
      declarations: [HomeComponent]
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});

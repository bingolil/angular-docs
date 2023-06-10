import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { CheckboxGroupComponent } from './checkbox-group.component';

describe('CheckboxGroupComponent Test', () => {
  let fixture: ComponentFixture<CheckboxGroupComponent>;
  let component: CheckboxGroupComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NzCheckboxModule],
      declarations: [CheckboxGroupComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CheckboxGroupComponent);
    component = fixture.componentInstance;
    component.options = [{ label: '游泳', value: 'swin' }, { label: '游戏', value: 'game' }];
  });
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('writeValue function', () => {
    component.writeValue(['swin']);
    const result = component.dataSource;
    result[0].checked = true;
    expect(component.dataSource).toEqual(result);
  });

  it('registerOnChange function', () => {
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);
    expect(component.onChange).toEqual(mockFn);
  });

  it('setDisabledState function', () => {
    component.setDisabledState(true);
    const result = component.dataSource.map(dd => ({ ...dd, ...{ disabled: true } }));
    expect(component.dataSource).toEqual(result);
  });

  it('changeItem function', () => {
    const mockFn = jest.fn();
    component.registerOnChange(mockFn);

    const list = component.dataSource;
    list[0].checked = true;
    component.changeItem(list);
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith(['swin']);

    list[1].checked = true;
    component.changeItem(list);
    expect(mockFn).toHaveBeenCalledWith(['swin', 'game']);
  });

});

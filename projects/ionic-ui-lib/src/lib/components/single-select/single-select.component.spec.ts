import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IuiSingleSelectComponent } from './single-select.component';

describe('IuiSingleSelectComponent', () => {
  let component: IuiSingleSelectComponent<unknown>;
  let fixture: ComponentFixture<IuiSingleSelectComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IuiSingleSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IuiSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Status');
    fixture.componentRef.setInput('options', [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options', () => {
    const options = fixture.nativeElement.querySelectorAll('ion-select-option');

    expect(options.length).toBe(2);
  });

  it('should write a selected value', () => {
    component.writeValue('active');
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('ion-select') as HTMLIonSelectElement;

    expect(select.value).toBe('active');
  });
});

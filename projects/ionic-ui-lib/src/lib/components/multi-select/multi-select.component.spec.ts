import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IuiMultiSelectComponent } from './multi-select.component';

describe('IuiMultiSelectComponent', () => {
  let component: IuiMultiSelectComponent<unknown>;
  let fixture: ComponentFixture<IuiMultiSelectComponent<unknown>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IuiMultiSelectComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IuiMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Roles');
    fixture.componentRef.setInput('options', [
      { label: 'Admin', value: 'admin' },
      { label: 'Editor', value: 'editor' }
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable Ionic multiple selection', () => {
    const select = fixture.nativeElement.querySelector('ion-select') as HTMLIonSelectElement;

    expect(select.multiple).toBeTrue();
  });

  it('should write selected values', () => {
    component.writeValue(['admin', 'editor']);
    fixture.detectChanges();

    const select = fixture.nativeElement.querySelector('ion-select') as HTMLIonSelectElement;

    expect(select.value).toEqual(['admin', 'editor']);
  });
});

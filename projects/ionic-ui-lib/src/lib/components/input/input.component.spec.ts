import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IuiInputComponent } from './input.component';

describe('IuiInputComponent', () => {
  let component: IuiInputComponent;
  let fixture: ComponentFixture<IuiInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IuiInputComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IuiInputComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Name');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should write a form value', () => {
    component.writeValue('Gurmeet');
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('ion-input') as HTMLIonInputElement;

    expect(input.value).toBe('Gurmeet');
  });

  it('should apply disabled state from forms', () => {
    component.setDisabledState(true);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('ion-input') as HTMLIonInputElement;

    expect(input.disabled).toBeTrue();
  });
});

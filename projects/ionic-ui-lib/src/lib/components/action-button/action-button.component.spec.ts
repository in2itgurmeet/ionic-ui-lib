import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IuiActionButtonComponent } from './action-button.component';

describe('IuiActionButtonComponent', () => {
  let component: IuiActionButtonComponent;
  let fixture: ComponentFixture<IuiActionButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IuiActionButtonComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IuiActionButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('label', 'Save');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the label', () => {
    const label = fixture.nativeElement.querySelector('span') as HTMLSpanElement;

    expect(label.textContent?.trim()).toBe('Save');
  });

  it('should disable the button while loading', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('ion-button') as HTMLIonButtonElement;

    expect(button.disabled).toBeTrue();
  });
});

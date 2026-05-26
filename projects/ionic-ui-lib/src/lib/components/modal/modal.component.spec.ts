import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IuiModalComponent } from './modal.component';

describe('IuiModalComponent', () => {
  let component: IuiModalComponent;
  let fixture: ComponentFixture<IuiModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IuiModalComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IuiModalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'User Details');
    fixture.componentRef.setInput('data', { id: 1, name: 'Gurmeet' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass modal data on confirm', () => {
    const confirmSpy = jasmine.createSpy('confirm');

    component.confirm.subscribe(confirmSpy);
    component['close']('confirm');

    expect(confirmSpy).toHaveBeenCalledWith({ id: 1, name: 'Gurmeet' });
  });

  it('should pass modal data on cancel', () => {
    const cancelSpy = jasmine.createSpy('cancel');

    component.cancel.subscribe(cancelSpy);
    component['close']('cancel');

    expect(cancelSpy).toHaveBeenCalledWith({ id: 1, name: 'Gurmeet' });
  });
});

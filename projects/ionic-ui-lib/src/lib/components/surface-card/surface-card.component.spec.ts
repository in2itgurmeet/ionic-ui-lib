import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IuiSurfaceCardComponent } from './surface-card.component';

describe('IuiSurfaceCardComponent', () => {
  let component: IuiSurfaceCardComponent;
  let fixture: ComponentFixture<IuiSurfaceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IuiSurfaceCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IuiSurfaceCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('title', 'Overview');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const title = fixture.nativeElement.querySelector('.iui-surface-card__title') as HTMLElement;

    expect(title.textContent?.trim()).toBe('Overview');
  });

  it('should apply the selected tone class', () => {
    fixture.componentRef.setInput('tone', 'success');
    fixture.detectChanges();

    const card = fixture.nativeElement.querySelector('.iui-surface-card') as HTMLElement;

    expect(card.classList).toContain('iui-surface-card--success');
  });
});

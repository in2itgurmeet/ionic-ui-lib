import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

export type IonicUiCardTone = 'default' | 'primary' | 'success' | 'warning' | 'danger';

@Component({
  selector: 'iui-surface-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './surface-card.component.html',
  styleUrl: './surface-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IuiSurfaceCardComponent {
  readonly eyebrow = input<string>();
  readonly title = input<string>();
  readonly subtitle = input<string>();
  readonly tone = input<IonicUiCardTone>('default');
}

import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import type { SpinnerTypes } from '@ionic/angular/standalone';

export type IonicUiButtonFill = 'clear' | 'outline' | 'solid';
export type IonicUiButtonSize = 'small' | 'default' | 'large';

@Component({
  selector: 'iui-action-button',
  standalone: true,
  imports: [IonButton, IonIcon, IonSpinner],
  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IuiActionButtonComponent {
  readonly label = input.required<string>();
  readonly icon = input<string>();
  readonly iconPosition = input<'start' | 'end'>('start');
  readonly color = input<string>('primary');
  readonly fill = input<IonicUiButtonFill>('solid');
  readonly size = input<IonicUiButtonSize>('default');
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly expand = input<'block' | 'full'>();
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly spinner = input<SpinnerTypes>('crescent');
  readonly buttonClicked = output<MouseEvent>();

  protected readonly iconSlot = computed(() => this.iconPosition());
}

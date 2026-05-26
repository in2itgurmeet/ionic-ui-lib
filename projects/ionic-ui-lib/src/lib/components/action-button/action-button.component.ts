import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { IonButton, IonIcon, IonSpinner } from '@ionic/angular/standalone';
import type { SpinnerTypes } from '@ionic/angular/standalone';

export type IonicUiButtonFill = 'clear' | 'outline' | 'solid';
export type IonicUiButtonSize = 'small' | 'default' | 'large';

@Component({
  selector: 'iui-action-button',
  standalone: true,
  imports: [IonButton, IonIcon, IonSpinner],
  template: `
    <ion-button
      class="iui-action-button"
      [type]="type()"
      [fill]="fill()"
      [color]="color()"
      [size]="size()"
      [disabled]="disabled() || loading()"
      [expand]="expand()"
      (click)="buttonClicked.emit($event)"
    >
      @if (loading()) {
        <ion-spinner aria-hidden="true" [name]="spinner()" />
      } @else if (icon()) {
        <ion-icon aria-hidden="true" [name]="icon()" [slot]="iconSlot()" />
      }

      <span>{{ label() }}</span>
    </ion-button>
  `,
  styles: `
    :host {
      display: inline-block;
    }

    :host([full-width]) {
      display: block;
    }

    .iui-action-button {
      min-height: 40px;
      font-weight: 600;
      letter-spacing: 0;
      text-transform: none;
    }
  `,
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

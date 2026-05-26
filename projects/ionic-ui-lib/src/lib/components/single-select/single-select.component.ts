import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonSelect, IonSelectOption } from '@ionic/angular/standalone';

export interface IuiSelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'iui-single-select',
  standalone: true,
  imports: [IonSelect, IonSelectOption],
  templateUrl: './single-select.component.html',
  styleUrl: './single-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IuiSingleSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IuiSingleSelectComponent<T = string> implements ControlValueAccessor {
  readonly label = input<string>();
  readonly placeholder = input('Select an option');
  readonly options = input<readonly IuiSelectOption<T>[]>([]);
  readonly interfaceType = input<'action-sheet' | 'alert' | 'popover'>('popover');
  readonly fill = input<'outline' | 'solid'>('outline');
  readonly labelPlacement = input<'end' | 'fixed' | 'floating' | 'stacked' | 'start'>('stacked');
  readonly disabledInput = input(false);
  readonly valueChanged = output<T | null>();

  protected readonly value = signal<T | null>(null);
  protected readonly isDisabled = signal(false);

  private onChange: (value: T | null) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: T | null): void {
    this.value.set(value ?? null);
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected handleChange(event: CustomEvent<{ value?: T | null }>): void {
    const nextValue = event.detail.value ?? null;

    this.value.set(nextValue);
    this.onChange(nextValue);
    this.valueChanged.emit(nextValue);
  }

  protected handleDismiss(): void {
    this.onTouched();
  }
}

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

import { IuiSelectOption } from '../single-select/single-select.component';

@Component({
  selector: 'iui-multi-select',
  standalone: true,
  imports: [IonSelect, IonSelectOption],
  templateUrl: './multi-select.component.html',
  styleUrl: './multi-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IuiMultiSelectComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IuiMultiSelectComponent<T = string> implements ControlValueAccessor {
  readonly label = input<string>();
  readonly placeholder = input('Select options');
  readonly options = input<readonly IuiSelectOption<T>[]>([]);
  readonly interfaceType = input<'action-sheet' | 'alert' | 'popover'>('alert');
  readonly fill = input<'outline' | 'solid'>('outline');
  readonly labelPlacement = input<'end' | 'fixed' | 'floating' | 'stacked' | 'start'>('stacked');
  readonly disabledInput = input(false);
  readonly valueChanged = output<T[]>();

  protected readonly value = signal<T[]>([]);
  protected readonly isDisabled = signal(false);

  private onChange: (value: T[]) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: T[] | null): void {
    this.value.set(value ?? []);
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected handleChange(event: CustomEvent<{ value?: T[] | T | null }>): void {
    const eventValue = event.detail.value;
    const nextValue = Array.isArray(eventValue) ? eventValue : [];

    this.value.set(nextValue);
    this.onChange(nextValue);
    this.valueChanged.emit(nextValue);
  }

  protected handleDismiss(): void {
    this.onTouched();
  }
}

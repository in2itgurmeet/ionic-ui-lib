import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  input,
  output,
  signal
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonInput } from '@ionic/angular/standalone';
import type { TextFieldTypes } from '@ionic/core/components';

@Component({
  selector: 'iui-input',
  standalone: true,
  imports: [IonInput],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IuiInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IuiInputComponent implements ControlValueAccessor {
  readonly label = input<string>();
  readonly placeholder = input('');
  readonly helperText = input<string>();
  readonly errorText = input<string>();
  readonly type = input<TextFieldTypes>('text');
  readonly fill = input<'outline' | 'solid'>('outline');
  readonly labelPlacement = input<'end' | 'fixed' | 'floating' | 'stacked' | 'start'>('stacked');
  readonly clearInput = input(false);
  readonly disabledInput = input(false);
  readonly readonlyInput = input(false);
  readonly valueChanged = output<string>();

  protected readonly value = signal('');
  protected readonly isDisabled = signal(false);

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected handleInput(event: CustomEvent<{ value?: string | null }>): void {
    const nextValue = event.detail.value ?? '';

    this.value.set(nextValue);
    this.onChange(nextValue);
    this.valueChanged.emit(nextValue);
  }

  protected handleBlur(): void {
    this.onTouched();
  }
}

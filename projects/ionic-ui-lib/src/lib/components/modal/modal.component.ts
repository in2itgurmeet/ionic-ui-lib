import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

export interface IuiModalCloseEvent<T = unknown> {
  role: 'cancel' | 'confirm' | 'dismiss';
  data: T | null;
}

@Component({
  selector: 'iui-modal',
  standalone: true,
  imports: [JsonPipe, IonButton, IonButtons, IonContent, IonHeader, IonModal, IonTitle, IonToolbar],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IuiModalComponent<T = unknown> {
  readonly isOpen = input(false);
  readonly title = input('Details');
  readonly data = input<T | null>(null);
  readonly confirmText = input('Done');
  readonly cancelText = input('Cancel');
  readonly showFooter = input(true);
  readonly backdropDismiss = input(true);
  readonly modalClosed = output<IuiModalCloseEvent<T>>();
  readonly confirm = output<T | null>();
  readonly cancel = output<T | null>();

  protected close(role: IuiModalCloseEvent<T>['role']): void {
    const payload = this.data();

    this.modalClosed.emit({ role, data: payload });

    if (role === 'confirm') {
      this.confirm.emit(payload);
      return;
    }

    this.cancel.emit(payload);
  }
}

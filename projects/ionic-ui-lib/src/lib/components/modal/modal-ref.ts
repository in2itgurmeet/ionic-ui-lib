import type { OverlayEventDetail } from '@ionic/core/components';

import { IuiActiveModal } from './active-modal';

export type IuiModalResultRole = 'close' | 'dismiss' | string;

export class IuiModalRef<TResult = unknown, TData = unknown> {
  readonly result: Promise<TResult>;

  constructor(
    private readonly modal: HTMLIonModalElement,
    readonly activeModal: IuiActiveModal<TData, TResult>
  ) {
    this.result = this.modal.onDidDismiss<TResult>().then((event) => {
      if (event.role === 'close') {
        return event.data as TResult;
      }

      return Promise.reject(event.data ?? event.role);
    });
  }

  close(result?: TResult): Promise<boolean> {
    return this.activeModal.close(result);
  }

  dismiss(reason?: unknown): Promise<boolean> {
    return this.activeModal.dismiss(reason);
  }

  onDidDismiss(): Promise<OverlayEventDetail<TResult>> {
    return this.modal.onDidDismiss<TResult>();
  }

  onWillDismiss(): Promise<OverlayEventDetail<TResult>> {
    return this.modal.onWillDismiss<TResult>();
  }
}

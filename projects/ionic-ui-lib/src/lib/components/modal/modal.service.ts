import { Injectable, Type } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';

import { IuiActiveModal } from './active-modal';
import { IuiModalOutletComponent } from './modal-outlet.component';
import { IuiModalRef } from './modal-ref';

export interface IuiModalOpenOptions<TData = unknown, TComponent = unknown> {
  data?: TData;
  componentProps?: Partial<TComponent> & Record<string, unknown>;
  title?: string;
  closeText?: string;
  showHeader?: boolean;
  cssClass?: string | string[];
  backdropDismiss?: boolean;
  animated?: boolean;
  presentingElement?: HTMLElement;
}

@Injectable({ providedIn: 'root' })
export class IuiModalService {
  constructor(private readonly modalController: ModalController) {}

  async open<TComponent, TData = unknown, TResult = unknown>(
    component: Type<TComponent>,
    options: IuiModalOpenOptions<TData, TComponent> = {}
  ): Promise<IuiModalRef<TResult, TData>> {
    const activeModal = new IuiActiveModal<TData, TResult>(options.data ?? null);
    const modal = await this.modalController.create({
      component: IuiModalOutletComponent,
      componentProps: {
        component,
        data: options.data ?? null,
        componentInputs: options.componentProps ?? {},
        activeModal,
        title: options.title ?? 'Details',
        closeText: options.closeText ?? 'Close',
        showHeader: options.showHeader ?? true
      },
      animated: options.animated,
      backdropDismiss: options.backdropDismiss ?? true,
      cssClass: options.cssClass,
      presentingElement: options.presentingElement
    });

    activeModal.attach(modal);
    await modal.present();

    return new IuiModalRef<TResult, TData>(modal, activeModal);
  }
}

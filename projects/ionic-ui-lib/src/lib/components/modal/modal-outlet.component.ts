import { NgComponentOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Injector,
  Input,
  OnChanges,
  Type
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { IuiActiveModal } from './active-modal';
import { IUI_MODAL_DATA } from './modal.tokens';

@Component({
  selector: 'iui-modal-outlet',
  standalone: true,
  imports: [NgComponentOutlet, IonButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar],
  template: `
    @if (showHeader) {
      <ion-header>
        <ion-toolbar>
          <ion-title>{{ title }}</ion-title>
          <ion-buttons slot="end">
            <ion-button fill="clear" (click)="activeModal.dismiss()">{{ closeText }}</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
    }

    <ion-content class="iui-modal-outlet__content">
      @if (component && contentInjector) {
        <ng-container
          *ngComponentOutlet="
            component;
            inputs: resolvedComponentInputs;
            injector: contentInjector
          "
        />
      }
    </ion-content>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .iui-modal-outlet__content {
      --padding-start: 16px;
      --padding-end: 16px;
      --padding-top: 16px;
      --padding-bottom: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IuiModalOutletComponent<TData = unknown> implements OnChanges {
  @Input({ required: true }) component!: Type<unknown>;
  @Input() data: TData | null = null;
  @Input() componentInputs: Record<string, unknown> = {};
  @Input() activeModal!: IuiActiveModal<TData>;
  @Input() title = 'Details';
  @Input() closeText = 'Close';
  @Input() showHeader = true;

  protected contentInjector?: Injector;
  protected resolvedComponentInputs: Record<string, unknown> = {};

  constructor(private readonly injector: Injector) {}

  ngOnChanges(): void {
    this.resolvedComponentInputs = {
      data: this.data,
      ...this.componentInputs
    };

    this.contentInjector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: IUI_MODAL_DATA, useValue: this.data },
        { provide: IuiActiveModal, useValue: this.activeModal }
      ]
    });
  }
}

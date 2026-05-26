import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ModalController } from '@ionic/angular/standalone';

import { IuiModalOutletComponent } from './modal-outlet.component';
import { IuiModalService } from './modal.service';

@Component({
  standalone: true,
  template: ''
})
class TestModalContentComponent {}

describe('IuiModalService', () => {
  let service: IuiModalService;
  let modalController: jasmine.SpyObj<ModalController>;
  let modalElement: jasmine.SpyObj<HTMLIonModalElement>;

  beforeEach(() => {
    modalElement = jasmine.createSpyObj<HTMLIonModalElement>('HTMLIonModalElement', [
      'dismiss',
      'onDidDismiss',
      'onWillDismiss',
      'present'
    ]);
    modalElement.present.and.resolveTo();
    modalElement.dismiss.and.resolveTo(true);
    modalElement.onDidDismiss.and.resolveTo({ data: 'saved', role: 'close' });
    modalElement.onWillDismiss.and.resolveTo({ data: 'saved', role: 'close' });

    modalController = jasmine.createSpyObj<ModalController>('ModalController', ['create']);
    modalController.create.and.resolveTo(modalElement);

    TestBed.configureTestingModule({
      providers: [
        IuiModalService,
        {
          provide: ModalController,
          useValue: modalController
        }
      ]
    });

    service = TestBed.inject(IuiModalService);
  });

  it('should create and present an Ionic modal outlet', async () => {
    await service.open(TestModalContentComponent, {
      data: { id: 1 },
      componentProps: { mode: 'edit' },
      title: 'Edit user'
    });

    expect(modalController.create).toHaveBeenCalledWith(
      jasmine.objectContaining({
        component: IuiModalOutletComponent,
        componentProps: jasmine.objectContaining({
          component: TestModalContentComponent,
          data: { id: 1 },
          componentInputs: { mode: 'edit' },
          title: 'Edit user'
        })
      })
    );
    expect(modalElement.present).toHaveBeenCalled();
  });

  it('should expose an NgbModal-like result promise', async () => {
    const modalRef = await service.open<TestModalContentComponent, { id: number }, string>(
      TestModalContentComponent,
      {
        data: { id: 1 }
      }
    );

    await expectAsync(modalRef.result).toBeResolvedTo('saved');
  });

  it('should close through the modal ref', async () => {
    const modalRef = await service.open<TestModalContentComponent, { id: number }, string>(
      TestModalContentComponent,
      {
        data: { id: 1 }
      }
    );

    await modalRef.close('done');

    expect(modalElement.dismiss).toHaveBeenCalledWith('done', 'close');
  });
});

# Ionic UI Lib

A professional reusable Ionic and Angular component library for Ionic Angular applications and standard Angular applications.

## Package Information

| Field | Value |
| --- | --- |
| Package name | `ionic-ui-lib` |
| Version | `1.0.0` |
| Author | Gurmeet Prajapati |
| Description | A professional reusable Ionic and Angular component library for Ionic Angular and standard Angular applications. |
| Repository | <https://github.com/in2itgurmeet/ionic-ui-lib> |
| Homepage | <https://github.com/in2itgurmeet/ionic-ui-lib#readme> |
| License | MIT |
| Documentation | <https://github.com/in2itgurmeet/ionic-ui-lib#readme> |
| Creator | Gurmeet Prajapati, <initgurmeet@gmail.com> |

## Installation

```bash
npm install ionic-ui-lib @ionic/angular
```

## Standard Angular Setup

Register Ionic providers once in your application config:

```ts
import { ApplicationConfig } from '@angular/core';
import { provideIonicUiLib } from 'ionic-ui-lib';

export const appConfig: ApplicationConfig = {
  providers: [
    provideIonicUiLib()
  ]
};
```

## Ionic Angular Setup

If your Ionic Angular app already calls `provideIonicAngular()`, you can import and use the library components directly.

```ts
import { Component } from '@angular/core';
import {
  IuiActionButtonComponent,
  IuiInputComponent,
  IuiModalService,
  IuiMultiSelectComponent,
  IuiSingleSelectComponent,
  IuiSurfaceCardComponent
} from 'ionic-ui-lib';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IuiActionButtonComponent,
    IuiInputComponent,
    IuiMultiSelectComponent,
    IuiSingleSelectComponent,
    IuiSurfaceCardComponent
  ],
  template: `
    <iui-surface-card
      eyebrow="Reusable UI"
      title="Professional Ionic + Angular components"
      subtitle="Works in Ionic Angular and standard Angular apps."
    >
      <iui-action-button label="Continue" icon="arrow-forward-outline" iconPosition="end" />
    </iui-surface-card>

    <iui-input label="Name" placeholder="Enter name" />

    <iui-single-select label="Status" [options]="statusOptions" />

    <iui-multi-select label="Roles" [options]="roleOptions" />

    <iui-action-button label="Open modal" (buttonClicked)="openUserModal()" />
  `
})
export class DashboardComponent {
  selectedUser = { id: 1, name: 'Gurmeet' };
  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' }
  ];
  roleOptions = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' }
  ];

  constructor(private readonly modal: IuiModalService) {}

  async openUserModal(): Promise<void> {
    const modalRef = await this.modal.open(UserDetailsModalComponent, {
      title: 'User details',
      data: this.selectedUser,
      componentProps: {
        mode: 'edit'
      }
    });

    const savedUser = await modalRef.result;
  }
}
```

## NgbModal-Style Modal

Open any standalone component from a service:

```ts
import { inject } from '@angular/core';
import { IuiModalService } from 'ionic-ui-lib';

export class UsersComponent {
  private readonly modal = inject(IuiModalService);

  async editUser(user: User): Promise<void> {
    const modalRef = await this.modal.open<UserModalComponent, User, User>(UserModalComponent, {
      title: 'Edit user',
      data: user,
      componentProps: {
        mode: 'edit'
      }
    });

    const savedUser = await modalRef.result;
  }
}
```

Read data and close from inside the modal component:

```ts
import { Component, inject } from '@angular/core';
import { IUI_MODAL_DATA, IuiActiveModal } from 'ionic-ui-lib';

@Component({
  standalone: true,
  template: `
    <button type="button" (click)="save()">Save</button>
  `
})
export class UserModalComponent {
  readonly user = inject(IUI_MODAL_DATA) as User;
  readonly activeModal = inject(IuiActiveModal<User, User>);

  save(): void {
    this.activeModal.close(this.user);
  }
}
```

## Build

```bash
npm run build:prod
```

The publishable package is generated in `dist/ionic-ui-lib`.

## Publish

```bash
npm run publish:lib
```

Before publishing, update the GitHub URLs in `projects/ionic-ui-lib/package.json` and this README if your repository owner or package name differs.

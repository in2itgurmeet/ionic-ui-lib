export class IuiActiveModal<TData = unknown, TResult = unknown> {
  private modal?: HTMLIonModalElement;

  constructor(readonly data: TData | null = null) {}

  attach(modal: HTMLIonModalElement): void {
    this.modal = modal;
  }

  close(result?: TResult): Promise<boolean> {
    return this.modal?.dismiss(result, 'close') ?? Promise.resolve(false);
  }

  dismiss(reason?: unknown): Promise<boolean> {
    return this.modal?.dismiss(reason, 'dismiss') ?? Promise.resolve(false);
  }
}

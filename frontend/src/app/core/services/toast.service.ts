import { Injectable, signal } from '@angular/core';

export interface ToastItem {
  id: number;
  type: 'success' | 'error';
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 1;
  private readonly defaultDurationMs = 4000;
  private readonly toastsState = signal<ToastItem[]>([]);

  readonly toasts = this.toastsState.asReadonly();

  success(message: string, durationMs = this.defaultDurationMs) {
    this.show('success', message, durationMs);
  }

  error(message: string, durationMs = this.defaultDurationMs + 1000) {
    this.show('error', message, durationMs);
  }

  dismiss(id: number) {
    this.toastsState.update((items) => items.filter((item) => item.id !== id));
  }

  private show(type: ToastItem['type'], message: string, durationMs: number) {
    const normalizedMessage = message.trim();
    if (!normalizedMessage) {
      return;
    }

    const id = this.nextId++;
    this.toastsState.update((items) => [...items, { id, type, message: normalizedMessage }]);
    window.setTimeout(() => this.dismiss(id), durationMs);
  }
}

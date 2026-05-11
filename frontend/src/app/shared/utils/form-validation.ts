import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

export function touchAllControls(control: AbstractControl | null): void {
  if (!control) {
    return;
  }

  control.markAsTouched();
  control.updateValueAndValidity({ onlySelf: true });

  if (control instanceof FormGroup || control instanceof FormArray) {
    Object.values(control.controls).forEach((childControl) => touchAllControls(childControl));
  }
}

export function clearControlState(control: AbstractControl | null): void {
  if (!control) {
    return;
  }

  control.markAsPristine();
  control.markAsUntouched();

  if (control instanceof FormGroup || control instanceof FormArray) {
    Object.values(control.controls).forEach((childControl) => clearControlState(childControl));
  }
}

export function hasVisibleError(control: AbstractControl | null, errorKey?: string): boolean {
  if (!control || !(control.touched || control.dirty) || !control.invalid) {
    return false;
  }

  return errorKey ? !!control.getError(errorKey) : true;
}

export function getVisibleErrorMessage(
  control: AbstractControl | null,
  messages: Record<string, string>,
  fallback = 'الرجاء التحقق من القيمة المدخلة.',
): string {
  if (!control || !(control.touched || control.dirty) || !control.errors) {
    return '';
  }

  const [firstErrorKey] = Object.keys(control.errors);
  return messages[firstErrorKey] || fallback;
}

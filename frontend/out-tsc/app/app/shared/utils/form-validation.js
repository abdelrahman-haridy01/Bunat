import { FormArray, FormGroup } from '@angular/forms';
export function touchAllControls(control) {
    if (!control) {
        return;
    }
    control.markAsTouched();
    control.updateValueAndValidity({ onlySelf: true });
    if (control instanceof FormGroup || control instanceof FormArray) {
        Object.values(control.controls).forEach((childControl) => touchAllControls(childControl));
    }
}
export function clearControlState(control) {
    if (!control) {
        return;
    }
    control.markAsPristine();
    control.markAsUntouched();
    if (control instanceof FormGroup || control instanceof FormArray) {
        Object.values(control.controls).forEach((childControl) => clearControlState(childControl));
    }
}
export function hasVisibleError(control, errorKey) {
    if (!control || !(control.touched || control.dirty) || !control.invalid) {
        return false;
    }
    return errorKey ? !!control.getError(errorKey) : true;
}
export function getVisibleErrorMessage(control, messages, fallback = 'الرجاء التحقق من القيمة المدخلة.') {
    if (!control || !(control.touched || control.dirty) || !control.errors) {
        return '';
    }
    const [firstErrorKey] = Object.keys(control.errors);
    return messages[firstErrorKey] || fallback;
}
//# sourceMappingURL=form-validation.js.map
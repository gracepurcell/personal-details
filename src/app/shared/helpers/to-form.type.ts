import { FormControl } from "@angular/forms";

// This creates a FormGroup type out of interfaces
export type ToFormGroup<T> = {
  [P in keyof T]: FormControl<T[P] | null>;
}

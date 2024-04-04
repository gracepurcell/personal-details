import { Component, NgZone } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { ToFormGroup } from '@shared/helpers/to-form.type';
import { IPersonalDetails } from '@shared/models/personal-details.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender } from '@shared/models/gender.enum';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { addDetails } from '@states/personal-details/personal-details.actions';


type PersonalDetailsForm = ToFormGroup<IPersonalDetails>;
@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent {

  form: FormGroup<PersonalDetailsForm>;
  genders = Object.values(Gender);

  constructor(
    private _store: Store<{personalDetails: IPersonalDetails}>,
  ) {

    this.form = new FormGroup<PersonalDetailsForm>({
      gender: new FormControl<string>('', Validators.required),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      dateOfBirth: new FormControl<string>('', Validators.required),
      nationality: new FormControl<string>('', Validators.required),
    });

    this._getCandidateInfo();
  }

  private _getCandidateInfo() {
    this._store
      .pipe(
        map((state) => state.personalDetails),
        takeUntilDestroyed(),
      )
      .subscribe((value) => this.form.patchValue(value));
  }

  setGender(value: Gender) {
    this.form.controls.gender.patchValue(value);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      return;
    }

    const details: IPersonalDetails = this.form.value as IPersonalDetails;
    this._patchValue(details);
  }

  private _patchValue(details: IPersonalDetails) {
    this._store.dispatch(addDetails(details));
  }

}

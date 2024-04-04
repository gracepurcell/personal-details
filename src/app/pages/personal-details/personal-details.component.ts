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
import { Notifications } from '@shared/services/notification.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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
    MatDatepickerModule
  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss'
})
export class PersonalDetailsComponent {

  form: FormGroup<PersonalDetailsForm>;
  genders = Object.values(Gender);

  minDate: Date;
  maxDate: Date;

  constructor(
    private _notifications: Notifications,
    private _store: Store<{personalDetails: IPersonalDetails}>,
  ) {

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 90);
    this.maxDate = new Date();

    this.form = new FormGroup<PersonalDetailsForm>({
      gender: new FormControl<string>('', Validators.required),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      dob: new FormControl<string>('', Validators.required),
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


  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      this._notifications.showError('Some fields are missing');
      return;
    }

    const details: IPersonalDetails = this.form.value as IPersonalDetails;
    this._patchValue(details);
  }

  private _patchValue(details: IPersonalDetails) {
    this._store.dispatch(addDetails(details));
    this._notifications.showSuccess('Successfully updated Details');
  }

}

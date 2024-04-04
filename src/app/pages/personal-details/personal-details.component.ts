import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { ToFormGroup } from '@shared/helpers/to-form.type';
import { IPersonalDetails } from '@shared/models/personal-details.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender } from '@shared/models/gender.enum';
import { CommonModule } from '@angular/common';

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

  constructor() {
    this.form = new FormGroup<PersonalDetailsForm>({
      gender: new FormControl<string>('', Validators.required),
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      dateOfBirth: new FormControl<string>('', Validators.required),
      nationality: new FormControl<string>('', Validators.required),
    });
  }

  setGender(value: Gender) {
    this.form.controls.gender.patchValue(value);
  }


}

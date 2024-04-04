import { createReducer, on } from "@ngrx/store";
import { IPersonalDetails } from "@shared/models/personal-details.model";
import { addDetails, updateDetails } from "./personal-details.actions";

export const initialState: IPersonalDetails = {
  gender: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  nationality: '',
}

export const personalDetailsReducer = createReducer(
  initialState,
  on(addDetails, (state, details) => ({
    ...state,
    ...details
  })),
  on(updateDetails, (state, details) => ({
    ...state,
    ...details
  }))
);



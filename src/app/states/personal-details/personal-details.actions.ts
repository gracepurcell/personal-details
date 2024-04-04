import { createAction, props } from "@ngrx/store";
import { IPersonalDetails } from "@shared/models/personal-details.model";

const component = 'Personal Details Component';
export const addDetails = createAction(`[${component}] Add Details`, props<IPersonalDetails>());
export const updateDetails = createAction(`[${component}] Update Details`, props<IPersonalDetails>());

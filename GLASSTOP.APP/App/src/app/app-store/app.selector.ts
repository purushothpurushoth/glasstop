import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from './app.state';

export const selectAppData = createFeatureSelector<IAppState>('appState');

export const selectUserInContext = createSelector(
  selectAppData,
  (store: IAppState) => store?.UserInContext
);

export const selectCompanyDetails = createSelector(
  selectAppData,
  (store: IAppState) => store?.CompanyDetails
);
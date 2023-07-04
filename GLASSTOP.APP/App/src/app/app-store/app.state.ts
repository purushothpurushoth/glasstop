import { ICompany, IUser } from '../app.interface';
import { ActionReducer } from '@ngrx/store';
import {mergeObjects, pick} from '../utils/app.utils';

export interface IAppState {
  UserInContext: IUser;
  CompanyDetails: ICompany;
}


function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState(localStorageKey: string): any {
  return JSON.parse(localStorage.getItem(localStorageKey) as string);
}

// the keys from state which we'd like to save.
const stateKeys = ['CompanyDetails', 'UserInContext'];
// the key for the local storage.

const localStorageKey = 'appState';

export function commonLocalStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  let onInit = true; // after load/refresh…
  return function (state: any, action: any): any {

    const nextState = reducer(state, action);
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      return mergeObjects(nextState, savedState);
    }
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}




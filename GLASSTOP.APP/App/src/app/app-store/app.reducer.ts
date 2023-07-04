import { AppAction, EAppAction } from './app.actions';
import { IAppState } from './app.state';


export function appReducer(state: IAppState, action: AppAction) {
  switch (action.type) {

    case EAppAction.SetUserInContext: {
      return {
        ...state,
        UserInContext: action.user,
      };
    }
    case EAppAction.ClearUserInContext: {
      return {
        ...state,
        UserInContext: {}
      };
    }
    case EAppAction.SetCompanyDetails: {
      return {
        ...state,
        CompanyDetails: action.company,
      };
    }
    case EAppAction.ClearCompanyDetails: {
      return {
        ...state,
        CompanyDetails: {}
      };
    }
    default: {
      return state;
    }
  }
}


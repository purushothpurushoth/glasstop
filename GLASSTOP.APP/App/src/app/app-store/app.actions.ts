import { Action } from '@ngrx/store';
import { ICompany, IUser } from '../app.interface';

export enum EAppAction {
  SetUserInContext = '[User][SetUserInContext]',
  ClearUserInContext = '[User][ClearUserInContext]',
  SetCompanyDetails = '[Company][SetCompanyDetails]',
  ClearCompanyDetails = '[Company][ClearCompanyDetails]'
}

export class UserInContext implements Action {
  public readonly type = EAppAction.SetUserInContext;
  constructor(public user: IUser) { }
}

export class ClearUserInContext implements Action {
  public readonly type = EAppAction.ClearUserInContext;
}


export class CompanyDetails implements Action {
  public readonly type = EAppAction.SetCompanyDetails;
  constructor(public company: ICompany) { }
}

export class ClearCompanyDetails implements Action {
  public readonly type = EAppAction.ClearCompanyDetails;

}
export type AppAction = UserInContext | ClearUserInContext | CompanyDetails | ClearCompanyDetails;

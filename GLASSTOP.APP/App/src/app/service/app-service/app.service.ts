import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, catchError, map, of } from 'rxjs';
import { selectCompanyDetails, selectUserInContext } from 'src/app/app-store/app.selector';
import { RESPONSE_STATUS } from 'src/app/app.constants';
import {
  GET_EMAIL_DEFAULT_TEMPLATES,
  GET_GLASSDOOR_INFO,
  GET_GLASSDOOR_RATING,
  GET_ROLES_URI,
  GET_USER_DETAILS,
  ICampaign,
  ICompany,
  ICompanyGlassdoorInfoRes,
  IEmailTemplate,
  IGlassDoorRating,
  IHttpErrorResponse,
  IPostAPIRes,
  IRole,
  IUser,
  SAVE_EMAIL_TEMPLATES,
  SAVE_USER_URI
} from 'src/app/app.interface';
import { getSaveUserReqBody } from 'src/app/utils/app.utils';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';
import { environment } from 'src/environments/environment';
import { COMPANY_GLASSDOOR_INFO_RES } from 'src/mock/company-glassdoor-template-mock';
import { emailTemplates } from 'src/mock/email-template-mock';
import { COMPANY_GLASSDOOR_RATING } from 'src/mock/glassdoor-rating-mock';
import { POST_RESPONSE } from 'src/mock/post-response-mocks';
import { roles } from 'src/mock/roles-mock';

@Injectable({
  providedIn: 'root',
})
export class AppService implements OnDestroy {
  private _subs: SubscriptionBundle = new SubscriptionBundle();
  private userInContext!: IUser;
  private userCompany!: ICompany;

  constructor(private http: HttpClient, private store: Store) {
    this._subs.add(
      this.store
        .select(selectUserInContext)
        .subscribe((user) => (this.userInContext = user)),
      this.store
        .select(selectCompanyDetails)
        .subscribe((company) => (this.userCompany = company))
    );
  }

  /**
   * @description Saves the User details.
   * @param user
   * @returns
   */
  public saveUser(user: IUser): Observable<IPostAPIRes> {
    const reqBody = getSaveUserReqBody(user);
    const requestURL = environment.API_BASSE_URI + 'User' + SAVE_USER_URI;
    if (environment.IS_MOCK) {
      return of(POST_RESPONSE);
    }
    return this.http.post<IPostAPIRes>(requestURL, reqBody);
  }
  
  /**
   * @description Get the User details.
   * @param user
   * @returns
   */
  public getUserByEmail(email: string): Observable<IUser> {
    const requestURL =
      environment.API_BASSE_URI +
      'User' +
      GET_USER_DETAILS +
      '?email=' +
      email;
    if (environment.IS_MOCK) {
      return of(this.userInContext);
    }
    return this.http.get<IUser>(requestURL);
  }

  /**
   * @description Fetches roles for a user.
   * @returns Observable<IRole[]>
   */
  public getUserRoles(): Observable<IRole[]> {
    const requestURL = environment.API_BASSE_URI + 'User' + GET_ROLES_URI;
    if (environment.IS_MOCK) {
      return of(roles);
    }
    return this.http.get<IRole[]>(requestURL);
  }

  /**
   * @description Fetches the Company Glassdoor Information
   * @returns Observable<IRole[] | IHttpErrorResponse>
   */
  public getCampanyGlassdoorInfo(
    campanyGlassdoorURL: string
  ): Observable<ICompanyGlassdoorInfoRes | IHttpErrorResponse> {
    const requestURL =
      `${environment.API_BASSE_URI}GlassdoorInfo${GET_GLASSDOOR_INFO}?url=${campanyGlassdoorURL}&companyId=${this.userCompany.id}&userId=${this.userInContext.id}` ;
    if (environment.IS_MOCK) {
      return of(COMPANY_GLASSDOOR_INFO_RES);
    }
    return (this.http.get<ICompanyGlassdoorInfoRes>(requestURL)).pipe(
      catchError(error => {
        let response: IHttpErrorResponse = { message: 'Something went wrong please try again later.', status: RESPONSE_STATUS.ERROR };
        return of(response);
      })
    );
  }

  /*
   * @description Fetches Glass door for a user.
   * @returns Observable<IGlassDoorRating[]>
   */
  public getGlassdoorRating(): Observable<IGlassDoorRating> {
    /**TODO: Company Name should be removed */
    const requestURL =
      environment.API_BASSE_URI +
      'GlassdoorInfo' +
      GET_GLASSDOOR_RATING +
      '?companyName=' +
      this.userCompany.name;

    if (environment.IS_MOCK) {
      return of(COMPANY_GLASSDOOR_RATING);
    }
    return this.http.get<IGlassDoorRating>(requestURL);
  }

  /**
   * @description Fetches the email templates for the emial campaign.
   * @returns Observable<IEmailTemplate[]>
   */
  public getEmailTemplates(): Observable<IEmailTemplate[]> {
    const requestURL =
      environment.API_BASSE_URI + 'EmailTemplate' + GET_EMAIL_DEFAULT_TEMPLATES;
    if (environment.IS_MOCK) {
      return of(emailTemplates);
    }
    return this.http.get<IEmailTemplate[]>(requestURL).pipe(
      map((templates: any) =>
        templates.map((template: any) => JSON.parse(template.emailMeta))
      )
    );
  }

  /**
   * @description Fetches the email templates for the emial campaign.
   * @returns Observable<IEmailTemplate[]>
   */
  public saveEmailTemplates(
    campaignDetails: ICampaign
  ): Observable<IPostAPIRes> {
    const reqBody = { ...campaignDetails, ...this.getReqBodyCommonParams() };
    /**TODO Remove this when DateTime format is changed */
    reqBody.transactedDate = new Date().toISOString();
    const requestURL =
      environment.API_BASSE_URI + 'EmailTemplate' + SAVE_EMAIL_TEMPLATES;
    if (environment.IS_MOCK) {
      return of(POST_RESPONSE);
    }
    return this.http.post<IPostAPIRes>(requestURL, reqBody);
  }

  /**
   * @description Constructs the common attibutes of a reuest payload.
   * @returns the common attributes of a reuest payload of a POST method
   */
  private getReqBodyCommonParams() {
    return {
      transactedDate: new Date()[Symbol.toPrimitive]('string'),
      transactedBy: this.userInContext?.id || '1',
      companyName: this.userCompany?.name || '',
      companyId: this.userCompany?.id ||'',
      remarks: '',
    };
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}

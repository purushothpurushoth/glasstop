import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectCompanyDetails, selectUserInContext } from 'src/app/app-store/app.selector';
import { ICompany, IPostAPIRes, IUser } from 'src/app/app.interface';
import { CAMPAIGN_USER, CampaignEmployee, CampaignUserReq, CampaignUserRes, DELETE_CAMPAIGN_USER_URI, GET_CAMPAIGN_USER_URI, SAVE_CAMPAIGN_USER_URI } from 'src/app/shared/upload-campaign-employees/upload-campaign-employees.interface';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';
import { environment } from 'src/environments/environment';
import { GET_EMPLOYEE_LIST_RESPONSE } from 'src/mock/get-employee-list-mock';

@Injectable({
  providedIn: 'root'
})
export class CampaignService implements OnDestroy {
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
   * @description Service to get list of compaign employees
   * @param {number} startRowIndex
   * @param {string} searchText
   * @returns {Observable<CampaignUserRes>}
   */
  public getEmployeeList(startRowIndex: number, searchText: string = ''): Observable<CampaignUserRes> {
    const reqPayload: CampaignUserReq = {  
      companyId: this.userCompany?.id || 1,
      campaignId: 1,
      startRowIndex,
      pageSize: 10,
      searchText
    };
    const requestURL = environment.API_BASSE_URI + CAMPAIGN_USER + GET_CAMPAIGN_USER_URI;
    if (environment.IS_MOCK) {
      return of(GET_EMPLOYEE_LIST_RESPONSE);
    }
    return this.http.post<CampaignUserRes>(requestURL, reqPayload);
  }

  /**
   * @description Service to remove employee(s)
   * @param {string} deleteCampaignUserIds 
   * @param {boolean} isDeleteAll
   * @param {string} searchText
   * @returns {Observable<IPostAPIRes>}
   */
  public removeEmployees(deleteCampaignUserIds: string = '', isDeleteAll: boolean = false, searchText: string = ''): Observable<IPostAPIRes> {
    const reqPayloadForRemove: CampaignUserReq = {  
      campaignId: 1,
      companyId: this.userCompany?.id || 1,
      transactedBy: this.userInContext?.id || 1,
      deleteCampaignUserIds,
      isDeleteAll,
      searchText
    };
    const requestURL = environment.API_BASSE_URI + CAMPAIGN_USER + DELETE_CAMPAIGN_USER_URI;
    return this.http.post<IPostAPIRes>(requestURL, reqPayloadForRemove);
  }

  /**
   * @description Service to save employee(s)
   * @param {CampaignEmployee[]} campaignEndUser 
   * @returns {Observable<IPostAPIRes>}
   */
  public saveCampaignUser(campaignEndUser: CampaignEmployee[] = []): Observable<IPostAPIRes> {
    const payload: CampaignUserReq = {  
      campaignId: 1,
      companyId: this.userCompany?.id || 1,
      transactedBy: this.userInContext?.id || 1,
      campaignEndUser
    };
    const requestURL = environment.API_BASSE_URI + CAMPAIGN_USER + SAVE_CAMPAIGN_USER_URI;
    return this.http.post<IPostAPIRes>(requestURL, payload);
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }

}

import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { CompanyDetails } from 'src/app/app-store/app.actions';
import { selectCompanyDetails } from 'src/app/app-store/app.selector';
import { GLASSDOOR_URLS, RESPONSE_STATUS } from 'src/app/app.constants';
import { ICompany, ICompanyGlassdoorInfoRes } from 'src/app/app.interface';
import { AppService } from 'src/app/service/app-service/app.service';
import { ToastService } from 'src/app/service/toast-service/toast.service';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';

@Component({
  selector: 'glasstop-glassdoor-confirmation',
  templateUrl: './glassdoor-confirmation.component.html',
  styleUrls: ['./glassdoor-confirmation.component.scss'],
})
export class GlassdoorConfirmationComponent {
  public template: ICompanyGlassdoorInfoRes | null = null;
  public isLoading = false;
  public isClaimed = false;
  public _companyGlassdoorURL: any = '';
  public _subs: SubscriptionBundle = new SubscriptionBundle();
  public companyDetails!:ICompany;

  public glassDoorUrlForm = this.fb.group({
    companyGlassdoorURL: ['', Validators.required],
  });

  constructor(
    private appService: AppService,
    private fb: FormBuilder,
    private toasterService: ToastService,
    private store: Store
  ) {
    /**
     * TODO: Checking company details whether getting or not from store
     * we can remove it if will use to other place.
     */
    this.store
      .select(selectCompanyDetails)
      .pipe(take(1))
      .subscribe((company: ICompany) => {
        if (company) {
          this.companyDetails = company;
          console.log('getComapny details', company)
          this.glassDoorUrlForm.patchValue({
            companyGlassdoorURL: company.url,
          });
          if (company.glassDoorScreenShot)
            this.template!.glassdoorPage = company.glassDoorScreenShot;
        } else {
          /**
           * We need to make one api call for getting other company details
           */
        }
      });
  }

  /**
   * @description Fetches the glassdoor page for the corresponding url.
   */
  public fetchGlassdoorImage() {
    this.template?.glassdoorPage && (this.template.glassdoorPage = '');
    if (this.isValidGlassdoorUrl()) {
      console.log('Glassdoor', this.glassDoorUrlForm.value);
      this.isLoading = true;
      this._subs.add(
        this.appService
          .getCampanyGlassdoorInfo(this._companyGlassdoorURL)
          .subscribe((res: any) => {
            if (res.status === RESPONSE_STATUS.ERROR) {
              this.isLoading = false;
              this.toasterService.showErrorToast(res.message);
            } else {
              if (res.responseStatus == 0) {
                this.isLoading = false;
                this.template = res;
                if (
                  !this.template?.glassdoorPage?.includes(
                    'data:image/png;base64,'
                  )
                ) {
                  this.template!.glassdoorPage =
                    'data:image/png;base64,' + res.glassdoorPage;
                }
                const companyDetails: ICompany = {
                  glassDoorScreenShot: this.template?.glassdoorPage,
                  url: this._companyGlassdoorURL,
                  isEngaged: res.claimedStatus
                };
                this.companyDetails = {...this.companyDetails, ...companyDetails};   
                this.isClaimed = res.claimedStatus;
                this.store.dispatch(new CompanyDetails(this.companyDetails));
              } else {
                this.isLoading = false;
                this.toasterService.showErrorToast(
                  'No result found, please check your company url'
                );
              }
            }
          })
      );
    } else {
      this.toasterService.showErrorToast('Invalid Glassdoor url');
    }
  }

  public isValidGlassdoorUrl(): boolean {
    const requestedUrl = this.glassDoorUrlForm.value
      ?.companyGlassdoorURL as string;
    this._companyGlassdoorURL = requestedUrl;
    this.isLoading = false;
    return (
      GLASSDOOR_URLS.some((url) => requestedUrl.startsWith(url)) &&
      requestedUrl.endsWith('.htm')
    );
  }
}

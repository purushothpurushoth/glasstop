import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectUserInContext } from 'src/app/app-store/app.selector';
import { IEmailTemplate, IUser } from 'src/app/app.interface';
import { AppService } from 'src/app/service/app-service/app.service';
import { CustomValidatorService } from 'src/app/service/custom-validator-service/custom-validator.service';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';

@Component({
  selector: 'glasstop-campaign-email-template',
  templateUrl: './campaign-email-template.component.html',
  styleUrls: ['./campaign-email-template.component.scss'],
})
export class CampaignEmailTemplateComponent implements OnInit, OnDestroy {
  public emailTemplates!: IEmailTemplate[];
  public user: IUser | null = null;
  private _subs: SubscriptionBundle = new SubscriptionBundle();

  public campaignForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private customValidatorService:CustomValidatorService
  ) { }

  ngOnInit() {
    this._subs.add(
      this.activatedRoute.data.subscribe((data: any) => {
        this.emailTemplates = data.emailTemplates;
        this.constructCampaignForm();
      }),
      this.store
        .select(selectUserInContext)
        .pipe(take(1))
        .subscribe((user) => (this.user = user))
    );
  }

  /**
   * @description constraucts the campaign form.
   */
  private constructCampaignForm() {
    this.campaignForm = this.fb.group({
      campaignName: ['Employee Email Campaign-1', Validators.required],
      emailTemplates: this.fb.array(this.getEmailTemplateFormGroups()),
    });
  }

  /**
   * @description constructs the emial template form group array.
   * @returns array of email template form group.
   */
  private getEmailTemplateFormGroups() {
    return this.emailTemplates.map((d) =>
      this.fb.group({
        SenderEmailId: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        MailSubject: ['', [Validators.required, this.customValidatorService.whitespaceValidator()]],
        MailBody: ['', [Validators.required, this.customValidatorService.sanitizeAndWhiteSpaceValidator()]],
        MailTemplateId: ['', Validators.required],
      })
    );
  }

  /**
   * @description Starts the campaign and navigates to next page.
   */
  public startCampaign() {
    this.appService.saveEmailTemplates(this.campaignForm.value).subscribe();
    this.router.navigate(['home/upload-campaign-employees']);
  }

  /**
   * @description Scrolls up to the Top.
   */
  public scrollToTop() {
    window.scrollTo({ top: 0 });
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

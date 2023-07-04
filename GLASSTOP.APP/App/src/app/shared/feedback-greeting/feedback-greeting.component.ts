import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IFeedBackForm } from 'src/app/app.interface';
import { CustomValidatorService } from 'src/app/service/custom-validator-service/custom-validator.service';
import { feedbackForm } from 'src/mock/feedback-greeting-mock';

@Component({
  selector: 'glasstop-feedback-greeting',
  templateUrl: './feedback-greeting.component.html',
  styleUrls: ['./feedback-greeting.component.scss'],
})
export class FeedbackGreetingComponent implements OnInit {
  private feedbackFormMock: IFeedBackForm = feedbackForm;

  constructor(
    private customValidatorService: CustomValidatorService,
    private fb: FormBuilder,
    private clipboard: Clipboard
  ) {}

  public ngOnInit() {
    this.feedbackForm.patchValue({
      starRating: this.feedbackFormMock?.starRating,
      reviewHeadline: this.feedbackFormMock?.reviewHeadline,
      pros: this.feedbackFormMock?.pros,
      cons: this.feedbackFormMock?.cons,
      adviceForManagement: this.feedbackFormMock?.adviceForManagement,
    });
  }

  public feedbackForm = this.fb.group({
    starRating: [0, [Validators.required]],
    reviewHeadline: [
      '',
      [Validators.required, this.customValidatorService.whitespaceValidator()],
    ],
    pros: [
      '',
      [Validators.required, this.customValidatorService.whitespaceValidator()],
    ],
    cons: [
      '',
      [Validators.required, this.customValidatorService.whitespaceValidator()],
    ],
    adviceForManagement: [
      '',
      [Validators.required, this.customValidatorService.whitespaceValidator()],
    ],
  });

  public onSubmit() {
    window.open(
      'https://www.glassdoor.com/mz-survey/employer/collectReview_input.htm'
    );
  }

  /**
   * @description Copies the content to the clipboard
   * @param content content that is to be copied to clipboard
   */
  public copyToClipboard(content: string) {
    this.clipboard.copy(content);
  }
}

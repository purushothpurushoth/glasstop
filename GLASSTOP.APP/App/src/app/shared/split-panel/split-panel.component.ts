import { Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { CompanyDetails, UserInContext } from 'src/app/app-store/app.actions';
import { selectUserInContext } from 'src/app/app-store/app.selector';
import {
  ACCEPTED_PROFILE_ICON_TYPE,
  ERROR_MESSAGE,
  MESSAGE_ON_CEO_INVITE,
  MESSAGE_ON_SIGNUP,
  MODAL_TYPE,
  RESPONSE_STATUS_CODE,
  ROUTES,
} from 'src/app/app.constants';
import {
  ICompany,
  IProfileIconUploadResponse,
  IRole,
  IUser,
} from 'src/app/app.interface';
import { AppService } from 'src/app/service/app-service/app.service';
import { CustomValidatorService } from 'src/app/service/custom-validator-service/custom-validator.service';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';
import { MultiFieldsModalComponent } from '../../custom-components/multi-fields-modal/multi-fields-modal.component';
import { ToastService } from 'src/app/service/toast-service/toast.service';

@Component({
  selector: 'glasstop-split-panel',
  templateUrl: './split-panel.component.html',
  styleUrls: ['./split-panel.component.scss'],
})
export class SplitPanelComponent implements OnInit {
  private _subs: SubscriptionBundle = new SubscriptionBundle();
  public profilePic = './../../../assets/default-user.png';
  public roles: IRole[] = [];
  public url: any;
  public modalRef?: BsModalRef | null;
  public route = '';
  public ROUTES = ROUTES;
  public user: IUser | null = null;
  public metaData = {
    name: '',
    designation: '',
    message: '',
    imageSource: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private bsModalService: BsModalService,
    private store: Store,
    private customValidatorService: CustomValidatorService,
    private toasterService: ToastService
  ) {}

  public profileForm = this.fb.group({
    firstName: [
      '',
      [Validators.required, this.customValidatorService.whitespaceValidator()],
    ],
    lastName: [
      '',
      [Validators.required, this.customValidatorService.whitespaceValidator()],
    ],
    email: [
      { value: '', disabled: true },
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    companyName: [
      '',
      [Validators.required, this.customValidatorService.whitespaceValidator()],
    ],
    photoUrl: '',
    roleId: ['', Validators.required],
  });

  public ceoMailForm = this.fb.group({
    email: ['', Validators.required],
  });

  public ngOnInit() {

    this._subs.add(
      this.activatedRoute.data.subscribe((data: any) => {
        this.route = data.route;
        switch (this.route) {
          case ROUTES.SIGN_UP:
            this.loadSignUpPage(data.user);
            break;
          case ROUTES.CEO_INVITE:
            this.metaData = {
              name: 'Gayathri Vivekanandan',
              designation: 'CEO - Ideas2IT Technologies',
              message: MESSAGE_ON_CEO_INVITE,
              imageSource: './../../../assets/CEO-image.png',
            };
            break;
        }
      }),
      this.store
        .select(selectUserInContext)
        .pipe(take(1))
        .subscribe((user) => (this.user = user)),
      this.appService.getUserRoles().subscribe((roles) => (this.roles = roles))
    );
  }

  private loadSignUpPage(user: IUser) {
    if (user) {
      this.profileForm.patchValue({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        photoUrl: user?.photoUrl,
      });
      user?.photoUrl && (this.profilePic = user?.photoUrl);
    }
    this.metaData = {
      name: 'Arunkumar Ganesan',
      designation: 'Director - Ideas2IT Technologies',
      message: MESSAGE_ON_SIGNUP,
      imageSource: './../../../assets/director-image.png',
    };
  }

  /**
   * @description Saves the user. This is called on submitting the user form.
   */
  public onSubmit() {
    const user: IUser = this.profileForm.getRawValue() as any;
    user.photoUrl = this.profilePic;
    this.appService.saveUser(user).subscribe((res: any) => {
      if (res?.statusCode === RESPONSE_STATUS_CODE.SUCCESS) {
        console.info('User Saved Successfully', res);
        if (res?.companyId) {
          const company: ICompany = {
            id: res?.companyId,
            name: user.companyName,
          };
          this.store.dispatch(new CompanyDetails(company));
        }
        res.userId && (user.id = res.userId) && this.store.dispatch(new UserInContext(user));
        this.router.navigate(['/home/glassdoor-confirmation']);
      } else {
        this.toasterService.showErrorToast(ERROR_MESSAGE.GENERIC);
      }
    });
  }

  /**
   * Uploads an image and displays it in a modal if it is in the required format.
   * @param {any} event - The event parameter is an object that represents the event that triggered the
   * function. In this case, it is an event that is fired when a file is selected for upload.
   */
  public uploadImage(event: any) {
    if (ACCEPTED_PROFILE_ICON_TYPE.includes(event.target.files[0].type)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      const modalOptions = {
        backdrop: true,
        ignoreBackdropClick: true,
        class: 'modal-dialog-centered',
        initialState: {
          modalType: MODAL_TYPE.IMAGE_UPLOAD_MODAL,
          imageChangedEvent: event,
        },
      };
      this.modalRef = this.bsModalService.show(
        MultiFieldsModalComponent,
        modalOptions
      );
      this.modalRef.content.subject.subscribe(
        (response: IProfileIconUploadResponse) =>
          response.status &&
          response.image &&
          (this.profilePic = response.image)
      );
    } else {
      this.toasterService.showErrorToast(ERROR_MESSAGE.INVALID_FILE_TYPE);
    }
    event.target.value = '';
  }

  /**
   * Removes the user's profile picture and sets it to a default image.
   */
  public removeProfilePicture() {
    this.profilePic = './../../../assets/default-user.png';
  }
}

import { Component, Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { take } from 'rxjs';
import { selectUserInContext } from 'src/app/app-store/app.selector';
import { IUser } from 'src/app/app.interface';
import { MultiFieldsModalComponent } from '../../custom-components/multi-fields-modal/multi-fields-modal.component';
import { MODAL_TYPE } from 'src/app/app.constants';

@Component({
  selector: 'glasstop-claim-procedure',
  templateUrl: './claim-procedure.component.html',
  styleUrls: ['./claim-procedure.component.scss'],
})
@Injectable()
export class ClaimProcedureComponent implements OnInit {
  public rightDownArrow = './../../../assets/right-down-arrow.png';
  public sampleImageVideo = './../../../assets/image-video.png';
  public modalRef?: BsModalRef | null;
  public user: IUser | null = null;

  constructor(private bsModalService: BsModalService, private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectUserInContext)
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  /**
   * @description Loads the video in a modal
   */
  public onLoadVideoInModal() {
    const modalOptions = {
      backdrop: true,
      ignoreBackdropClick: true,
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        title: '👇 Here’s how you can claim your glassdoor page',
        trueButtonText: 'Clear',
        isIframeVisible: true,
        url: 'https://www.youtube.com/embed/iMJBfc4X8uA?autoplay=1',
        modalType: MODAL_TYPE.IFRAME_MODAL,
      },
    };
    this.modalRef = this.bsModalService.show(
      MultiFieldsModalComponent,
      modalOptions
    );
  }
}

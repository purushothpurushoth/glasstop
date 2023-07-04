import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { SAMPLE_EXCEL_URL } from 'src/app/app.constants';

@Component({
  selector: 'glasstop-multi-fields-modal',
  templateUrl: './multi-fields-modal.component.html',
  styleUrls: ['./multi-fields-modal.component.scss'],
})
export class MultiFieldsModalComponent {
  public modalType = '';
  public imageChangedEvent: any;
  public croppedImage: any;
  public errorMessage = '';
  public title: string = '';
  public body: string =
    'Are you sure you want to discard changes made on the page?';
  isIframeVisible = false;
  public canvasRotation = 0;
  modalRef?: BsModalRef;
  public isRequiredSize: boolean = true;
  url = '';
  public subject = new Subject<any>();
  public modalContent: any = {};
  public loaderPercentage: number = 0;
  public toast: any;

  constructor(
    public bsModalRef: BsModalRef,
    public options: ModalOptions,
    private router: Router
  ) {
    this.modalContent = this.options.initialState;
  }  

  /**
   * Checks the size and dimensions of an image and displays an error message if it
   * exceeds certain limits.
   * @param {any} event - an object that contains information about the image being cropped
   */
  public imageCropped(event: any) {
    this.errorMessage = '';
    const base64str = event.base64.split('base64,')[1];
    const decoded = Buffer.from(base64str, 'base64').toString('utf-8');
    const size = decoded.length / 1000000;
    this.croppedImage = event.base64;
    let image = new Image();
    image.src = event.base64;
    image.onload = () => {
      const { height, width } = image;
      if (size < 10) {
        if (height < 400 && width < 400) {
          this.isRequiredSize = false;
          this.errorMessage = '* File size is too low to Upload';
        } else {
          this.isRequiredSize = true;
        }
      } else {
        this.isRequiredSize = false;
        this.errorMessage = '* File size exceed 10mb to Upload';
      }
    };
  }

  // Closes the modal
  public close() {
    this.subject.next({ status: false });
    this.bsModalRef.hide();
  }

  /**
   * Sends an image and upload status to a subject and close a modal.
   */
  public submit() {
    this.subject.next({ image: this.croppedImage, status: true });
    this.bsModalRef.hide();
  }

  /**
   * Method to confirm action on the dialog box.
   */
  public confirm() {
    this.subject.next({ status: true });
    this.bsModalRef.hide();
  }

  /**
   * rotates a image either to the right or left direction.
   * @param {string} direction - string (a string value indicating the direction of rotation, either
   * "right" or any other value)
   */
  public rotate(direction: string) {
    if (direction === 'right') {
      this.canvasRotation++;
    } else {
      this.canvasRotation--;
    }
  }

  /**
  *  Sample Excel File will download when click "Download Sample Template"
  */
  downloadSampleTemplate() {
    console.log('downloadSampleTemplate');
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.download = 'Sample_Excel';
    link.href = SAMPLE_EXCEL_URL;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => {
      this.bsModalRef.hide();
    }, 0);
  }

  dispose() {
    this.bsModalRef.hide();
  }
}

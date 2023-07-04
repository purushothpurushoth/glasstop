import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxEditorModule } from 'ngx-editor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgxPaginationModule } from 'ngx-pagination';
import { DataTableComponent } from '../custom-components/data-table/data-table.component';
import { MultiFieldsModalComponent } from '../custom-components/multi-fields-modal/multi-fields-modal.component';
import { StarRatingComponent } from '../custom-components/star-rating/star-rating.component';
import { ToastComponent } from '../custom-components/toast/toast.component';
import { ToasterComponent } from '../custom-components/toaster/toaster.component';
import { SafePipe } from '../pipe/safe';
import { CustomValidatorService } from '../service/custom-validator-service/custom-validator.service';

@NgModule({
  declarations: [
    MultiFieldsModalComponent,
    SafePipe,
    DataTableComponent,
    ToasterComponent,
    ToastComponent,
    StarRatingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ImageCropperModule,
    NgxPaginationModule,
    NgxEditorModule.forRoot({}),
  ],
  exports: [DataTableComponent, ToasterComponent, StarRatingComponent],
  providers: [SafePipe, CustomValidatorService],
})
export class SharedModule {}

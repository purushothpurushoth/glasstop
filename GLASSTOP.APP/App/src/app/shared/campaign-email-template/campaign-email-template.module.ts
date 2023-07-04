import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
import { ChipSelectComponent } from 'src/app/custom-components/chip-select/chip-select.component';
import { EmailTemplateComponent } from '../email-template/email-template.component';
import { CampaignEmailTemplateComponent } from './campaign-email-template.component';

const routes: Routes = [
  { path: '', component: CampaignEmailTemplateComponent },
];

@NgModule({
  declarations: [
    CampaignEmailTemplateComponent,
    EmailTemplateComponent,
    ChipSelectComponent
  ],
  imports: [
    CommonModule,
    NgxEditorModule.forRoot({}),
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CampaignEmailTemplateModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UploadCampaignEmployeesComponent } from './upload-campaign-employees.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [
  { path: '', component: UploadCampaignEmployeesComponent },
];

@NgModule({
  declarations: [
    UploadCampaignEmployeesComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule],
})
export class UploadCampaignEmployeesModule {}

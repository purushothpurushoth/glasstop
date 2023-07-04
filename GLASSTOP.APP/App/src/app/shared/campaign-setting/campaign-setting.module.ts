import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CampaignSettingComponent } from './campaign-setting.component';

const routes: Routes = [{ path: '', component: CampaignSettingComponent }];

@NgModule({
  declarations: [
    CampaignSettingComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class CampaignSettingModule {}

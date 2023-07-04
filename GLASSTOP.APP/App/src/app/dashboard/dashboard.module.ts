import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { CampaignCardComponent } from '../shared/campaign-card/campaign-card.component';
import { SharedModule } from '../shared/shared.module';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { TopBarComponent } from './top-bar/top-bar.component';


@NgModule({
  declarations: [DashboardComponent, CampaignCardComponent, SidePanelComponent, TopBarComponent],
  imports: [CommonModule, SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}

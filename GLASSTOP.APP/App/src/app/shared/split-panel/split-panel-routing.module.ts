import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitPanelComponent } from './split-panel.component';

const routes: Routes = [{ path: '', component: SplitPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplitPanelRoutingModule { }

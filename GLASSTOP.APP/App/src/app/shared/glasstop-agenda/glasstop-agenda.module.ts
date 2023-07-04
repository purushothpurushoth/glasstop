import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlasstopAgendaComponent } from './glasstop-agenda.component';
import { SharedModule } from '../shared.module';

const routes: Routes = [{ path: '', component: GlasstopAgendaComponent }];

@NgModule({
  declarations: [GlasstopAgendaComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlasstopAgendaModule {}

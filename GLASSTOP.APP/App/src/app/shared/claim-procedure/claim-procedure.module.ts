import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClaimProcedureComponent } from './claim-procedure.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: ClaimProcedureComponent }];

@NgModule({
  declarations: [
    ClaimProcedureComponent
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimProcedureModule { }

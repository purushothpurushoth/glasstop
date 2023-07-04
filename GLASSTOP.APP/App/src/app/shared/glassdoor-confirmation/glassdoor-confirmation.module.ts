import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GlassdoorConfirmationComponent } from './glassdoor-confirmation.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: GlassdoorConfirmationComponent }];

@NgModule({
  declarations: [GlassdoorConfirmationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [RouterModule],
})
export class GlassdoorConfirmationModule {}

import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared.module';
import { FeedbackGreetingComponent } from './feedback-greeting.component';

const routes: Routes = [{ path: '', component: FeedbackGreetingComponent }];

@NgModule({
  declarations: [FeedbackGreetingComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClipboardModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
})
export class FeedbackGreetingModule {}

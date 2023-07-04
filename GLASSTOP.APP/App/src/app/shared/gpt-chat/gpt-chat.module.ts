import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GptChatComponent } from './gpt-chat.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: GptChatComponent }];

@NgModule({
  declarations: [GptChatComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class GptChatModule {}

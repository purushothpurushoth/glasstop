import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./shared/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./shared/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'gpt-chat/:companyId/:campaignId/:employeeId',
    loadChildren: () =>
      import('./shared/gpt-chat/gpt-chat.module').then((m) => m.GptChatModule),
  },
  {
    path: 'feedback-greeting',
    loadChildren: () =>
      import('./shared/feedback-greeting/feedback-greeting.module').then(
        (m) => m.FeedbackGreetingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

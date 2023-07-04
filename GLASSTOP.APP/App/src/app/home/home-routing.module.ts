import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from '../app.constants';
import {
  emailTemplateResolver,
  userResolver,
} from '../service/app-resolver.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: ROUTES.SIGN_UP,
        loadChildren: () =>
          import('./../shared/split-panel/split-panel.module').then(
            (m) => m.SplitPanelModule
          ),
        data: { route: ROUTES.SIGN_UP },
        resolve: { user: userResolver },
      },
      {
        path: 'claim-procedure',
        loadChildren: () =>
          import('./../shared/claim-procedure/claim-procedure.module').then(
            (m) => m.ClaimProcedureModule
          ),
      },
      {
        path: 'glassdoor-confirmation',
        loadChildren: () =>
          import(
            '../shared/glassdoor-confirmation/glassdoor-confirmation.module'
          ).then((m) => m.GlassdoorConfirmationModule),
      },
      {
        path: 'glasstop-agenda',
        loadChildren: () =>
          import('./../shared/glasstop-agenda/glasstop-agenda.module').then(
            (m) => m.GlasstopAgendaModule
          ),
      },
      {
        path: ROUTES.CEO_INVITE,
        loadChildren: () =>
          import('./../shared/split-panel/split-panel.module').then(
            (m) => m.SplitPanelModule
          ),
        data: { route: ROUTES.CEO_INVITE },
      },
      {
        path: 'campaign-email-template',
        loadChildren: () =>
          import(
            './../shared/campaign-email-template/campaign-email-template.module'
          ).then((m) => m.CampaignEmailTemplateModule),
        resolve: { emailTemplates: emailTemplateResolver },
      },
      {
        path: 'upload-campaign-employees',
        loadChildren: () =>
          import('./../shared/upload-campaign-employees/upload-campaign-employees.module').then(
            (m) => m.UploadCampaignEmployeesModule
          ),
      },
      {
        path: 'campaign-settings',
        loadChildren: () =>
          import('../shared/campaign-setting/campaign-setting.module').then(
            (m) => m.CampaignSettingModule
          )
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }

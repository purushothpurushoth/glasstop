import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserInContext } from '../app-store/app.selector';
import { IEmailTemplate, IUser } from '../app.interface';
import { AppService } from './app-service/app.service';

export const userResolver: ResolveFn<IUser> = () => {
  const cs = inject(Store);
  return cs.select(selectUserInContext);
};

export const emailTemplateResolver: ResolveFn<IEmailTemplate[]> = () => {
  const cs = inject(AppService);
  return cs.getEmailTemplates();
};

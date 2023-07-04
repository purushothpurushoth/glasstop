import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ERROR_MESSAGE } from '../app.constants';
import { ToastService } from '../service/toast-service/toast.service';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor(private toastService: ToastService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        this.toastService.showErrorToast(ERROR_MESSAGE.TRY_AGAIN_LATER);
        return of(error);
      })
    )
  }
}
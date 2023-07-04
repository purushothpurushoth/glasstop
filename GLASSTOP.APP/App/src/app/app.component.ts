import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from './service/local-storage.service';
import { CompanyDetails, UserInContext } from './app-store/app.actions';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'glasstop';

  constructor(
    private store: Store,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    const storedState = this.localStorageService.getItem('appState');

    if (storedState) {
      const parsedState = JSON.parse(storedState);
      const r: any = Object.keys(parsedState);

      for(let i=0; i<r.length;i++) {
        const des =  r[i];
        if (des == 'CompanyDetails' ) {
          this.store.dispatch(new CompanyDetails(parsedState[des]));
        } else if (des == 'UserInContext') {
          this.store.dispatch(new UserInContext(parsedState[des]));
        }
      }
    }
  }
}

import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserInContext } from 'src/app/app-store/app.actions';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';

@Component({
  selector: 'glasstop-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private _subs: SubscriptionBundle = new SubscriptionBundle();
  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this._subs.add(
      this.authService.authState.subscribe((user: SocialUser) => {
        this.store.dispatch(new UserInContext(user));
        this.router.navigate(['/home/sign-up']);
      })
    );
  }

  ngOnDestroy() {
    this._subs.unsubscribe();
  }
}

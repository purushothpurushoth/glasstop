import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, filter, take, takeUntil } from 'rxjs';
import { ClearCompanyDetails, ClearUserInContext } from 'src/app/app-store/app.actions';
import { selectUserInContext } from 'src/app/app-store/app.selector';
import { NO_PROFILE_ICON_ROUTE } from 'src/app/app.constants';
import { IUser } from 'src/app/app.interface';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';

@Component({
  selector: 'glasstop-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent implements OnInit, OnDestroy {
  public canShowActions = true;
  public profileIcon = "./../../../assets/default-user.png";
  public user!: IUser;
  public currentRoute = this.router.url;
  private _subs: SubscriptionBundle = new SubscriptionBundle();

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this._subs.add(
      this.store
        .select(selectUserInContext)
        .subscribe((user) => {
          this.user = user;
          this.user && (this.profileIcon = this.user.photoUrl ? this.user.photoUrl : "./../../../assets/default-user.png");
        }),
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe((event) => {
        event && (this.currentRoute = (event as NavigationEnd).url)
        this.setAction();
      })
    )
    this.setAction();
  }

  /**
   * @description: Sets a boolean value to determine if actions can be shown based on the current route.
   */
  public setAction() {
    this.canShowActions = !NO_PROFILE_ICON_ROUTE.includes(this.currentRoute);
  }

  /**
   * Clears the user in context by dispatching a ClearUserInContext and ClearCompanyDetails action.
   */
  public clearUser() {
    this.store.dispatch(new ClearCompanyDetails());
    this.store.dispatch(new ClearUserInContext());
    localStorage.removeItem('appState');  // delete the item
    this.router.navigate(['']);
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}

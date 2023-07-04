import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectUserInContext } from 'src/app/app-store/app.selector';
import { IUser } from 'src/app/app.interface';
import { AppService } from 'src/app/service/app-service/app.service';
import { SubscriptionBundle } from 'src/app/utils/subscription-bundle';

@Component({
  selector: 'glasstop-glasstop-agenda',
  templateUrl: './glasstop-agenda.component.html',
  styleUrls: ['./glasstop-agenda.component.scss'],
})
export class GlasstopAgendaComponent implements OnInit, OnDestroy {
  public leftToRightUpArrow = './../../../assets/left-to-right-up-arrow.png';
  public leftToRightDownArrow =
    './../../../assets/left-to-right-down-arrow.png';
  public currentRating!: number;
  public user: IUser | null = null;
  private _subs: SubscriptionBundle = new SubscriptionBundle();

  constructor(private appService: AppService, private store: Store) { }

  ngOnInit() {
    this._subs.add(
      this.appService.getGlassdoorRating().subscribe((response) => {
        if (response?.overallRating) {
          this.currentRating = response.overallRating;
        }
      }),
      this.store
        .select(selectUserInContext)
        .subscribe((user) => (this.user = user))
    );
  }

  ngOnDestroy(): void {
    this._subs.unsubscribe();
  }
}

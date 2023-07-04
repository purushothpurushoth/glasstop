import { Component } from '@angular/core';

@Component({
  selector: 'glasstop-campaign-card',
  templateUrl: './campaign-card.component.html',
  styleUrls: ['./campaign-card.component.scss'],
})
export class CampaignCardComponent {

  /**
   * @description Changes the Campaign Status
   * @param $event 
   */
  public toggleCampaignStatus($event: any) {
    console.log($event.target.checked);
  }
}

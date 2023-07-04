import { Component } from '@angular/core';

@Component({
  selector: 'glasstop-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  public panelMenus = [
    {
      name: 'All campaigns',
      icon: 'bi-send ',
      routeUrl: './all-campaigns',
    },
  ];
}

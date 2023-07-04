import { Component, Input } from '@angular/core';

@Component({
  selector: 'glasstop-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent {
  @Input()
  public title: string = '';

}

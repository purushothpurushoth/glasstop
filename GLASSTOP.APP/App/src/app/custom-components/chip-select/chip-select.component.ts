import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IChip } from 'src/app/app.interface';

@Component({
  selector: 'glasstop-chip-select',
  templateUrl: './chip-select.component.html',
  styleUrls: ['./chip-select.component.scss'],
})
export class ChipSelectComponent {
  public chips!: IChip[];
  private tempChips!: IChip[];

  @Input()
  public set chipAsStrings(chipAsStrings: string[] | undefined) {
    this.chips = (chipAsStrings || []).map(
      (data: string) =>
        ({
          label: data,
          isSelected: false,
        } as IChip)
    );
    //Cloning the array objects.
    this.tempChips = JSON.parse(JSON.stringify(this.chips));
  }

  @Output()
  public selectedChip = new EventEmitter();

  public onChipSelect(chip: any, i: number) {
    this.selectedChip.emit(chip.innerHTML);
    this.chips = JSON.parse(JSON.stringify(this.tempChips));
    this.chips[i].isSelected = true;
  }
}

import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'glasstop-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
})
export class StarRatingComponent implements OnChanges {
  @Input()
  public ratings: number = 0;
  @Input()
  public totalRatings: number = 5;
  @Input()
  public color: string = '#31a927';
  @Input()
  ratingFontSize: number = 22;
  @Input()
  starFontSize: number = 16;
  @Input()
  canShowNumeric: boolean = true;

  public starRatings: { style: any }[] = [];

  ngOnChanges() {
    this.totalRatings &&
      this.generateRatingsObject(this.ratings, this.totalRatings);
  }

  /**
   * @description generates the star rating object with styles.
   * @param ratings actual ratings
   * @param totalRatings total ratings
   */
  public generateRatingsObject(ratings: number, totalRatings: number) {
    if (totalRatings >= ratings) {
      for (let i = 0; i < totalRatings; i++) {
        if (1 <= ratings) {
          this.starRatings.push({
            style: {
              background: `linear-gradient(to right, ${this.color} 100%, #E0E0E0)`,
              '-webkit-background-clip': 'text',
              'font-size': this.starFontSize + 'px',
            },
          });
          --ratings;
        } else if (0 < ratings) {
          this.starRatings.push({
            style: {
              background: `linear-gradient(to right, ${this.color}, #E0E0E0 ${
                ratings * 100 + 15
              }%)`,
              '-webkit-background-clip': 'text',
              'font-size': this.starFontSize + 'px',
            },
          });
          ratings = 0;
        } else {
          this.starRatings.push({
            style: {
              background: '#E0E0E0',
              '-webkit-background-clip': 'text',
              'font-size': this.starFontSize + 'px',
            },
          });
        }
      }
    }
  }

  /**
   * @description constructs the styles based on the input variables
   */
  getRatingsStyles() {
    return {
      color: this.color,
      'font-size': this.ratingFontSize + 'px',
      'font-weight': 'bold',
    };
  }
}

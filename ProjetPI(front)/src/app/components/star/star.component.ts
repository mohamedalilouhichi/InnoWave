import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent {
  @Input() rating: number = 0;
  @Input() maxRating: number = 5;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();

  get filledStars(): number[] {
    return Array(Math.floor(this.rating)).fill(0);
  }

  get emptyStars(): number[] {
    return Array(Math.floor(this.maxRating - this.rating)).fill(0);
  }

  rate(rating: number): void {
    this.ratingClicked.emit(rating);
  }
}

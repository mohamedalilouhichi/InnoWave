import { Component, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() dataImage: string = '';
  @Input() name: string = '';
 @Input() description: string = '';
 @Input() importanceLevel: number = 0;




  rX = 0;
  rY = 0;
  tX = 0;
  tY = 0;

  constructor(private el: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const card = this.el.nativeElement.querySelector('.card');
    const cardRect = card.getBoundingClientRect();
    const mouseX = event.pageX - cardRect.left - cardRect.width / 2;
    const mouseY = event.pageY - cardRect.top - cardRect.height / 2;

    // Adapt the multiplying factor (-30, -40) based on your design requirements
    this.rX = mouseX * -0.05;
    this.rY = mouseY * 0.05;
    this.tX = mouseX * -0.1;
    this.tY = mouseY * -0.1;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.resetTransform();
  }

  private resetTransform() {
    this.rX = 0;
    this.rY = 0;
    this.tX = 0;
    this.tY = 0;
  }
}

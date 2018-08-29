import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  clicked = false;
  constructor() { }

  ngOnInit() {
  }

  selectCard() {
    this.clicked = !this.clicked;
  }

}

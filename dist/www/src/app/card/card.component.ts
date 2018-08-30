import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item;
  @Output() songSelect = new EventEmitter<any>();
  clicked = false;
  hovered = false;
  constructor() { }

  ngOnInit() {
    console.log(this.item);
  }

  selectCard() {
    this.clicked = !this.clicked;
  }

  hoverCard() {
    this.hovered = !this.hovered;
  }

  playSong(e) {
    this.songSelect.emit({songId:this.item.id.videoId});
  }

}

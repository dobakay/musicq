import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() searchexec = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  searchQuery($event) {
    let query = $event.target.value;
    this.searchexec.emit({_query: query});
  }

}

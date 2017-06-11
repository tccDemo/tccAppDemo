import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bookmark-filter',
  templateUrl: 'bookmark-filter.html'
})
export class BookmarkFilterComponent {

  @Input()
  filter: string = "myFavour";

  @Output() 
  onRefreshBookmarks = new EventEmitter<string>();

  constructor() {

  }
  
  change(){
  	this.onRefreshBookmarks.emit(this.filter);
  }
}

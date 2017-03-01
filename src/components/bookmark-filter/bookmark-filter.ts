import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bookmark-filter',
  templateUrl: 'bookmark-filter.html'
})
export class BookmarkFilterComponent {

  filter: string = "myFavour";

  @Output() 
  onRefreshBookmarks = new EventEmitter<string>();

  constructor() {

  }


  change(){
  	console.log("change"+ this.filter);
  	this.onRefreshBookmarks.emit(this.filter);
  }
}

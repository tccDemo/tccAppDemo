import { Component } from '@angular/core';
import { NavController, NavParams,ViewController, Platform } from 'ionic-angular';
import { ThemeableBrowser } from "ionic-native";  

import { Bookmark } from '../../providers/bookmark';
import { BookmarkService } from '../../providers/bookmark.service';

@Component({
  selector: 'page-bookmark-detail',
  templateUrl: 'bookmark-detail.html'
})
export class BookmarkDetailPage {

  bookmark:Bookmark;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public bookmarkService: BookmarkService,
    public platform: Platform
  	){}

  ngOnInit(): void {
    this.getBookmark(this.params.get('bookmarkId'));    
  }

  getBookmark(bookmarkId: number): void {
    this.bookmarkService.getBookmark(bookmarkId).then( (bookmark: Bookmark) => {this.bookmark = bookmark;this.launchFromThemeableBrowser()} );
  }

  dismiss():void {
    this.viewCtrl.dismiss();
  }

  launchFromThemeableBrowser() {  
  
    let browser = new ThemeableBrowser(this.bookmark.link, '_blank', this.options);  

  }  

  private options = {  
    statusbar: {  
      color: '#ffffffff'  
    },  
    toolbar: {  
      height: 44,  
      color: '#f0f0f0ff'  
    },  
    title: {  
      color: '#003264ff',  
      showPageTitle: true  
    },  
    backButton: {  
      image: 'back',  
      imagePressed: 'back_pressed',  
      align: 'left',  
      event: 'backPressed'  
    },  
    forwardButton: {  
      image: 'forward',  
      imagePressed: 'forward_pressed',  
      align: 'left',  
      event: 'forwardPressed'  
    },  
    closeButton: {  
      image: 'close',  
      imagePressed: 'close_pressed',  
      align: 'left',  
      event: 'closePressed'  
    },  
    customButtons: [  
      {  
        image: 'share',  
        imagePressed: 'share_pressed',  
        align: 'right',  
        event: 'sharePressed'  
      }  
    ],  
    menu: {  
      image: 'menu',  
      imagePressed: 'menu_pressed',  
      title: 'Test',  
      cancel: 'Cancel',  
      align: 'right',  
      items: [  
        {  
          event: 'helloPressed',  
          label: 'Hello World!'  
        },  
        {  
          event: 'testPressed',  
          label: 'Test!'  
        }  
      ]  
    },  
    backButtonCanClose: true  
  };  
}

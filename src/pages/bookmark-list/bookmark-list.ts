import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController  } from 'ionic-angular';
import { ThemeableBrowser } from "ionic-native";  

import { Bookmark } from '../../providers/bookmark';
import { BookmarkService } from '../../providers/bookmark.service';

import { DragulaService } from 'ng2-dragula';
import { Dragula } from 'dragula';

declare var $:any;

@Component({
  selector: 'page-bookmark-list',
  templateUrl: 'bookmark-list.html'
})
export class BookmarkListPage {

  bookmarks: Bookmark[];
  isTileView: boolean = true;
  filter:string = "myFavour";

  constructor(private navCtrl: NavController, private navParams: NavParams, 
  	private bookmarkService: BookmarkService, private modalCtrl: ModalController,
    private dragulaService: DragulaService, private zone: NgZone){

    dragulaService.drop.subscribe((value:any) => {
      this.doSort(value.slice(1));
    });

  }

  private doSort(args:any):void {
    var seq = 0;
    let [el, target, source] = args;

    for (var i=0; i<target.children.length;i++) {
      this.bookmarkService.updateSeq(target.children[i].bookmarkId, seq++);
    }
    this.refreshBookmarks(this.filter);
  }

  ionViewDidLoad() {
  }

  
  ngOnInit(): void {
    this.refreshBookmarks("myFavour");
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);    
    setTimeout(() => {
      this.bookmarks = [];
      this.refreshBookmarks(this.filter);
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

  refreshBookmarks(bookmarkFilter:string): void {
    this.filter = bookmarkFilter || this.filter;
  	if (this.filter == "all") {
  		this.getAllBookmarks();
  	} else if (this.filter == "myFavour") {
  		this.getMyFavourBookmarks();
  	} else if (this.filter == "popular") {
  		this.getPopularBookmarks();
  	} else if (this.filter == "recent") {
  		this.getRecentlyBookmarks();
  	} else {
      this.filter = "myFavour";
  		this.getMyFavourBookmarks();
  	}
  }

  doSearch(ev): void {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.bookmarks = this.bookmarks.filter((item) => {
        return (item.subject.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.refreshBookmarks(this.filter);
    }
  }

  getAllBookmarks(): void {
    this.bookmarkService.getAllBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  getMyFavourBookmarks(): void {
    this.bookmarkService.getMyFavourBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  getPopularBookmarks(): void {
    this.bookmarkService.getPopularBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  getRecentlyBookmarks(): void {
    this.bookmarkService.getRecentlyBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  switchView():void{
    this.isTileView = !this.isTileView;
  }

  focusSearch(ev):void{
    console.log(ev)
  }

  openDetailBookmark(bookmarkId:number) {
  	this.bookmarkService.getBookmark(bookmarkId).then((bookmark:Bookmark)=>this.launchFromThemeableBrowser(bookmark));
  }

  launchFromThemeableBrowser(bookmark:Bookmark) {  	
  	var self = this; 
  	// var imageValue = bookmark.isMyFavour ? "unfavour" : "favour";

    let options: any = {  
    statusbar: {  
      color: '#2eb3feff'  
    },  
    toolbar: {  
      height: 44,  
      color: '#2eb3feff'  
    },  
    title: {  
      color: '#ffffffff',  
      showPageTitle: true  
    },  
    backButton: {  
      image: 'back',  
      imagePressed: 'back_pressed',  
      align: 'left',  
      event: 'backPressed'  
    },  
    forwardButton: {  
      image: 'forward',  
      imagePressed: 'forward_pressed',  
      align: 'left',  
      event: 'forwardPressed'  
    },  
    closeButton: {  
      image: 'close',  
      imagePressed: 'close_pressed',  
      align: 'left',  
      event: 'closePressed'  
    },  
    customButtons: [  
      {  
             image: "favour",
             imagePressed: 'press_favour',
             align: 'right',
             'event': 'markFavour' 
      }  
    ],  
  
    backButtonCanClose: false
  };

    let browser: ThemeableBrowser = new ThemeableBrowser(bookmark.link, '_self', options);
    var isDelete = false;

     browser.on('markFavour').subscribe(
      (data) => {   
        
        var msg = bookmark.isMyFavour ? "Do you want to remove this link from your favorite list?" : "Do you want to add this link into your favorite list?";

        if (confirm(msg)) {
          bookmark.isMyFavour = !bookmark.isMyFavour;
          self.bookmarkService.markFavour(bookmark.id, bookmark.isMyFavour);
          // options.customButtons[0].image = bookmark.isMyFavour ? "unfavour" : "favour";
          if (bookmark.isMyFavour) {
           alert("Added this link to your favorite list!");
          } else {
           alert("Removed this link from your favorite list!");
          }

          if (self.filter == "myFavour") {
            // var bookmarks:Bookmark[] = new Array();
            // for(var i=0; i<self.bookmarks.length; i++) {
            //   if(self.bookmarks[i].id != bookmark.id) {
            //     bookmarks.push(self.bookmarks[i]);
            //   }       
            // }
            // self.zone.run(() => self.bookmarks = bookmarks);            
            self.zone.run(()=>self.refreshBookmarks(self.filter));
          }
        }   
      }, 
      (err) => {    
       console.error('onError');  
    }); 
 }
}

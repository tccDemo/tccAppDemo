export const appToolBar = {
  hideTabsBar: function () {
    let tabBars = document.querySelectorAll('.tabbar');
    if (tabBars != null) {
      Object.keys(tabBars).map((key) => {
        tabBars[key].style.display = 'none'
      })
    }
  },
  showTabsBar: function () {
    let tabBars = document.querySelectorAll(".tabbar");
    if (tabBars != null) {
      Object.keys(tabBars).map((key) => {
        tabBars[key].style.display = 'flex';
      });
    }
  }
}

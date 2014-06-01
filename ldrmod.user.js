// ==UserScript==
// @name ldrmod
// @namespace scheakur.com
// @include http://reader.livedoor.com/reader/
// @include http://reader.livedoor.com/public/*
// @version 0.1.0
// ==/UserScript==

(function (w) {
  function prefetch() {
    var num = 10;
    w.get_unread.cache.max = 1000;
    w.Ordered.list.forEach(function (id) {
      if (num > 0 && !w.get_unread.cache.has(id) && w.subs_item(id).unread_count) {
        num--;
        w.prefetch(id);
      }
    });
  }

  function openInTab() {
    var item = w.get_active_item(true);
    if (!item) {
      return;
    }
    setTimeout(function () {
      GM_openInTab(item.link);
    }, 0);
  }

  let onload = function () {
    w.Keybind.add('m', prefetch);
    w.Keybind.add('v', openInTab);
  };

  let _onload = w.onload;

  w.onload = function () {
    _onload();
    onload();
  };
}(this.unsafeWindow || this.window));
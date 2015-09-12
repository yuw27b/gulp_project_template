(function () {
  'use strict';

  var app = {
    init: function () {
      this.cacheElements();
      this.bindEvents();
      this.someVar = 'aaa';
    },

    cacheElements: function () {
      this.body = document.querySelector('body');
    },

    bindEvents: function () {
      this.body.addEventListener('mousemove', this.mousemove.bind(this), false);
    },

    mousemove: function () {
      this.someVar = `aaa${this.someVar}aaa`;
    }

  }; //appEND.

  app.init();

})();

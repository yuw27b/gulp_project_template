(function () {
  'use strict';

  var util = {
    getParams: function () {
      var ret = _.chain(location.search.slice(1).split('&'))
      .map(function (item) {return item.split('='); })
      .object()
      .value();
      return ret;
    }

  }; //utilEND

  var app = {
    init: function () {
      this.cacheElements();
      this.bindEvents();
      this.someVar = 'aaa';
      this.params = util.getParams();
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

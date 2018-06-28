'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var DEBOUNCE_INTERVAL = 300;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  var getRandomIndex = function (min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  };

  var getRandomLengthArray = function (elements) {
    var count = getRandomIndex(1, elements.length);

    return elements.slice(0, count);
  };

  var getRandomSortElements = function (elements) {
    return elements.slice().sort(function () {
      return Math.random() > 0.5 ? 1 : -1;
    });
  };

  var lastTimeout;

  var debounce = function (fun) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };

  window.debounce = debounce;

  window.utils = {
    getRandomIndex: getRandomIndex,
    getRandomLengthArray: getRandomLengthArray,
    getRandomSortElements: getRandomSortElements,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
    debounce: debounce
  };
})();

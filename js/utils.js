'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  /*
  var getRandomElement = function (elements) {
    var index = Math.floor(Math.random() * elements.length);
    return elements[index];
  };*/

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

  window.utils = {
    getRandomIndex: getRandomIndex,
    getRandomLengthArray: getRandomLengthArray,
    getRandomSortElements: getRandomSortElements,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();

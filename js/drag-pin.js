'use strict';

(function () {
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 620;
  var SPEARHEAD_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    mainPin.style.zIndex = 2;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: moveEvt.clientX - startCoords.x,
        y: moveEvt.clientY - startCoords.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = mainPin.offsetLeft + shift.x;
      var newY = mainPin.offsetTop + shift.y;

      if (newX < 0) {
        newX = 0;
      }

      if (newX > mainPin.parentElement.offsetWidth - mainPin.offsetWidth) {
        newX = mainPin.parentElement.offsetWidth - mainPin.offsetWidth;
      }

      if (newY < LOCATION_Y_MIN) {
        newY = LOCATION_Y_MIN;
      }

      if (newY > LOCATION_Y_MAX) {
        newY = LOCATION_Y_MAX;
      }

      mainPin.style.left = newX + 'px';
      mainPin.style.top = newY + 'px';

      var addressX = newX + Math.round(mainPin.offsetWidth / 2);
      var addressY = newY + mainPin.offsetHeight + SPEARHEAD_HEIGHT;

      addressInput.value = addressX + ', ' + addressY;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

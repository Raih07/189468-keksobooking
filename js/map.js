'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var onMainPinMouseUp = function () {
    window.form.toggleMapFormDisable(false);
    window.pin.renderAllPins(window.advertsData.adverts);
    window.form.setAddress(mainPin.offsetLeft, mainPin.offsetTop, false);
  };

  mainPin.addEventListener('mouseup', onMainPinMouseUp);

  window.form.toggleMapFormDisable(true);
  window.form.setAddress(mainPin.offsetLeft, mainPin.offsetTop, true);
})();

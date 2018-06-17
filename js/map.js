'use strict';

(function () {
  var SPEARHEAD_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var addressInput = adForm.querySelector('#address');

  var setAddress = function (left, top, isBigPin) {
    var x = left + Math.round(mainPin.offsetWidth / 2);
    var y = isBigPin ? top + Math.round(mainPin.offsetHeight / 2) : top + mainPin.offsetHeight + SPEARHEAD_HEIGHT;

    addressInput.value = x + ', ' + y;
  };

  var toggleMapFormDisable = function (isDisabled) {
    map.classList.toggle('map--faded', isDisabled);
    adForm.classList.toggle('ad-form--disabled', isDisabled);

    for (var i = 0; i < adFormFieldsets.length; i++) {
      adFormFieldsets[i].disabled = isDisabled;
    }
  };

  var onMainPinMouseUp = function () {
    toggleMapFormDisable(false);
    window.pin.renderAllPins(window.advertsData.adverts);
    setAddress(mainPin.offsetLeft, mainPin.offsetTop, false);
  };

  mainPin.addEventListener('mouseup', onMainPinMouseUp);

  toggleMapFormDisable(true);
  setAddress(mainPin.offsetLeft, mainPin.offsetTop, true);

  window.map = {
    setAddress: setAddress,
    toggleMapFormDisable: toggleMapFormDisable
  };
})();

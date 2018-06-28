'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var PIN_COUNT = 5;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (pinData) {
    var pin = mapPinTemplate.cloneNode(true);

    pin.addEventListener('click', function () {
      window.advertCard.showAdvertCard(map, pinData);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.advertCard.showAdvertCard(map, pinData);
      }
    });

    pin.style.left = pinData.location.x - pin.offsetWidth / 2 + 'px';
    pin.style.top = pinData.location.y - pin.offsetHeight + 'px';
    pin.querySelector('img').src = pinData.author.avatar;
    pin.querySelector('img').alt = pinData.offer.title;

    return pin;
  };

  var renderAllPins = function (elements) {
    var elementsCount = elements.length > PIN_COUNT ? PIN_COUNT : elements.length;

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elementsCount; i++) {
      fragment.appendChild(renderPin(elements[i]));
    }
    mapPins.appendChild(fragment);
  };

  var removePins = function () {
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      mapPins.removeChild(pins[i]);
    }
  };

  window.pin = {
    renderAllPins: renderAllPins,
    removePins: removePins
  };
})();

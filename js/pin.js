'use strict';

(function () {
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (pinData, pinNumberData) {
    var pin = mapPinTemplate.cloneNode(true);

    pin.addEventListener('click', function () {
      //window.advertCard.showAdvertCard(map, window.advertsData.adverts[pinNumberData]);
      window.advertCard.showAdvertCard(map, pinData);
    });

    pin.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        //window.advertCard.showAdvertCard(map, window.advertsData.adverts[pinNumberData]);
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
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < elements.length; i++) {
      fragment.appendChild(renderPin(elements[i], i));
    }
    mapPins.appendChild(fragment);
  };

  window.pin = {
    renderAllPins: renderAllPins
  };
})();

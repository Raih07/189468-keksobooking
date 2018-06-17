'use strict';

(function () {
  var MAX_ROOM_VALUE = 100;
  var NO_GUEST_VALUE = 0;
  var MAP_PIN_LEFT = '570px';
  var MAP_PIN_TOP = '375px';

  var adForm = document.querySelector('.ad-form');
  var tittleInput = adForm.querySelector('#title');
  var homeTypeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var resetButton = adForm.querySelector('.ad-form__reset');

  var onTittleInputInvalid = function () {
    if (tittleInput.validity.tooShort) {
      tittleInput.setCustomValidity('Минимальное число символов: ' + tittleInput.minLength);
    } else if (tittleInput.validity.tooLong) {
      tittleInput.setCustomValidity('Максимальное число символов: ' + tittleInput.maxLength);
    } else if (tittleInput.validity.valueMissing) {
      tittleInput.setCustomValidity('Обязательное поле');
    } else {
      tittleInput.setCustomValidity('');
      tittleInput.classList.remove('error');
    }
  };

  tittleInput.addEventListener('invalid', onTittleInputInvalid);
  tittleInput.addEventListener('change', function (evt) {
    evt.target.checkValidity();
  });

  var onPriceInputInvalid = function () {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity('Минимальная цена: ' + priceInput.min);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Максимальная цена: ' + priceInput.max);
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Обязательное поле');
    } else {
      priceInput.setCustomValidity('');
      priceInput.classList.remove('error');
    }
  };

  priceInput.addEventListener('invalid', onPriceInputInvalid);
  priceInput.addEventListener('change', function (evt) {
    evt.target.checkValidity();
  });

  var setMapTypeToPrice = function () {
    priceInput.min = window.advertsData.homesMap[homeTypeInput.value].minPrice;
    priceInput.placeholder = window.advertsData.homesMap[homeTypeInput.value].minPrice;
  };

  homeTypeInput.addEventListener('change', setMapTypeToPrice);


  var setCapacity = function () {
    if (+roomNumberInput.value < roomNumberInput.length) {
      capacityInput.value = roomNumberInput.value;
    } else {
      capacityInput.value = NO_GUEST_VALUE;
    }

    for (var i = 0; i < capacityInput.length; i++) {
      var option = capacityInput.options[i];
      var notForGuests = +option.value === NO_GUEST_VALUE;

      if (+roomNumberInput.value === MAX_ROOM_VALUE) {
        option.disabled = !notForGuests;
      } else {
        option.disabled = notForGuests || +option.value > +roomNumberInput.value;
      }
    }
  };

  roomNumberInput.addEventListener('change', setCapacity);

  var onTimeInInputChange = function () {
    timeOutInput.value = timeInInput.value;
  };

  timeInInput.addEventListener('change', onTimeInInputChange);

  var onTimeOutInputChange = function () {
    timeInInput.value = timeOutInput.value;
  };

  timeOutInput.addEventListener('change', onTimeOutInputChange);

  var onFormInvaliv = function (evt) {
    var errorInput = evt.target;
    errorInput.classList.add('error');
  };

  adForm.addEventListener('invalid', onFormInvaliv, true);

  var onResetButtonClick = function () {
    adForm.reset();
    window.map.toggleMapFormDisable(true);
    window.advertCard.closeAdvert();

    var map = document.querySelector('.map');
    var mapPins = map.querySelector('.map__pins');
    var mainPin = map.querySelector('.map__pin--main');
    var pins = mapPins.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (var i = 0; i < pins.length; i++) {
      mapPins.removeChild(pins[i]);
    }

    mainPin.style.left = MAP_PIN_LEFT;
    mainPin.style.top = MAP_PIN_TOP;
    window.map.setAddress(mainPin.offsetLeft, mainPin.offsetTop, true);
  };

  resetButton.addEventListener('click', onResetButtonClick);

  setCapacity();
  setMapTypeToPrice();
})();

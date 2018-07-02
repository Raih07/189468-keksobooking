'use strict';

(function () {
  var MAX_ROOM_VALUE = 100;
  var NO_GUEST_VALUE = 0;
  var MAP_PIN_LEFT = '570px';
  var MAP_PIN_TOP = '375px';
  var SPEARHEAD_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  var tittleInput = adForm.querySelector('#title');
  var homeTypeInput = adForm.querySelector('#type');
  var priceInput = adForm.querySelector('#price');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');
  var roomNumberInput = adForm.querySelector('#room_number');
  var capacityInput = adForm.querySelector('#capacity');
  var addressInput = adForm.querySelector('#address');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var successPopap = document.querySelector('.success');

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
    priceInput.min = window.advertCard.homesMap[homeTypeInput.value].minPrice;
    priceInput.placeholder = window.advertCard.homesMap[homeTypeInput.value].minPrice;
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

  var onDocumentEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeSuccess);
  };

  var onSuccessPopapClick = function () {
    closeSuccess();
  };

  var showSuccess = function () {
    successPopap.classList.remove('hidden');
    document.addEventListener('keydown', onDocumentEscPress);
    document.addEventListener('click', onSuccessPopapClick);
  };

  var closeSuccess = function () {
    successPopap.classList.add('hidden');
    document.removeEventListener('keydown', onDocumentEscPress);
    document.removeEventListener('click', onSuccessPopapClick);
  };

  var onResetButtonClick = function () {
    adForm.reset();
    window.filesUpload.setAvatarDefault();
    window.filesUpload.setPhotosDefault();
    setCapacity();
    toggleMapFormDisable(true);
    window.advertCard.closeAdvert();
    window.pin.removePins();

    mainPin.style.left = MAP_PIN_LEFT;
    mainPin.style.top = MAP_PIN_TOP;
    setAddress(mainPin.offsetLeft, mainPin.offsetTop, true);
  };

  resetButton.addEventListener('click', onResetButtonClick);

  adForm.addEventListener('submit', function (evt) {
    window.backend.uploadData(new FormData(adForm), function () {
      showSuccess();
      adForm.reset();
      window.filesUpload.setAvatarDefault();
      window.filesUpload.setPhotosDefault();
      setCapacity();
      setMapTypeToPrice();
      setAddress(mainPin.offsetLeft, mainPin.offsetTop, false);
    }, window.showError);

    evt.preventDefault();
  });

  var toggleMapFormDisable = function (isDisabled) {
    map.classList.toggle('map--faded', isDisabled);
    adForm.classList.toggle('ad-form--disabled', isDisabled);

    [].forEach.call(adFormFieldsets, function (item) {
      item.disabled = isDisabled;
    });
  };

  var setAddress = function (left, top, isBigPin) {
    var x = left + Math.round(mainPin.offsetWidth / 2);
    var y = isBigPin ? top + Math.round(mainPin.offsetHeight / 2) : top + mainPin.offsetHeight + SPEARHEAD_HEIGHT;

    addressInput.value = x + ', ' + y;
  };

  setCapacity();
  setMapTypeToPrice();

  window.form = {
    setAddress: setAddress,
    toggleMapFormDisable: toggleMapFormDisable
  };
})();

'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var ADVERT_COUNT = 8;
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var SPEARHEAD_HEIGHT = 22;
var LOCATION_X_MIN = 300;
var LOCATION_X_MAX = 900;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var PRICE_MIN = 1000;
var PRICE_MAX = 1000000;
var HOME_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOM_MIN = 1;
var ROOM_MAX = 5;
var GUEST_MIN = 1;
var GUEST_MAX = 10;
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var HOMES_MAP = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var titles = TITLES.slice();

var getRandomIndex = function (min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

var getTitle = function (words) {
  var index = getRandomIndex(0, words.length - 1);
  var title = words[index];

  words.splice(index, 1);

  return title;
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

var createAdvert = function (countAdvert) {
  var userAvatar = 'img/avatars/user0' + countAdvert + '.png';
  var advertTitle = getTitle(titles);
  var locationX = getRandomIndex(LOCATION_X_MIN, LOCATION_X_MAX);
  var locationY = getRandomIndex(LOCATION_Y_MIN, LOCATION_Y_MAX);
  var advertAdress = locationX + ', ' + locationY;
  var advertPrice = getRandomIndex(PRICE_MIN, PRICE_MAX);
  var advertType = HOME_TYPES[getRandomIndex(0, HOME_TYPES.length - 1)];
  var roomCount = getRandomIndex(ROOM_MIN, ROOM_MAX);
  var guestCount = getRandomIndex(GUEST_MIN, GUEST_MAX);
  var checkinTime = TIMES[getRandomIndex(0, TIMES.length - 1)];
  var checkoutTime = TIMES[getRandomIndex(0, TIMES.length - 1)];
  var advertFeatures = getRandomLengthArray(FEATURES);
  var sortedPhotos = getRandomSortElements(PHOTOS);

  return {
    author: {
      avatar: userAvatar
    },

    offer: {
      title: advertTitle,
      address: advertAdress,
      price: advertPrice,
      type: advertType,
      rooms: roomCount,
      guests: guestCount,
      checkin: checkinTime,
      checkout: checkoutTime,
      features: advertFeatures,
      description: '',
      photos: sortedPhotos
    },
    location: {
      x: locationX,
      y: locationY
    }
  };

};

var createArrayAdverts = function (count) {
  var adverts = [];

  for (var i = 0; i < count; i++) {
    adverts.push(createAdvert(i + 1));
  }

  return adverts;
};

var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var mainPin = map.querySelector('.map__pin--main');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
var mapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var adForm = document.querySelector('.ad-form');
var adFormFieldsets = adForm.querySelectorAll('fieldset');
var formAdressInput = adForm.querySelector('#address');


var getAddress = function () {
  var left = mainPin.offsetLeft - Math.round(mainPin.offsetWidth / 2);
  var top = mainPin.offsetTop - (mainPin.offsetHeight + SPEARHEAD_HEIGHT);

  formAdressInput.value = left + ', ' + top;
};

var toggleMapFormDisable = function(isDisabled) {
  map.classList.toggle('map--faded', isDisabled);
  adForm.classList.toggle('ad-form--disabled', isDisabled);

  for (var i = 0; i < adFormFieldsets.length; i++) {
    adFormFieldsets[i].disabled = isDisabled;
  }
};

var onMainPinMouseUp = function () {
  toggleMapFormDisable(false);
  renderAllPin(adverts);
  getAddress();
  mainPin.removeEventListener('mouseup', onMainPinMouseUp);
};

mainPin.addEventListener('mouseup', onMainPinMouseUp);

var renderPin = function (pinData, pinNumberData) {
  var pin = mapPinTemplate.cloneNode(true);

  pin.addEventListener('click', function () {
    showAdvertCard(map, adverts[pinNumberData]);
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      showAdvertCard(map, adverts[pinNumberData]);
    }
  });

  pin.style.left = pinData.location.x - pin.offsetWidth / 2 + 'px';
  pin.style.top = pinData.location.y - pin.offsetHeight + 'px';
  pin.querySelector('img').src = pinData.author.avatar;
  pin.querySelector('img').alt = pinData.offer.title;

  return pin;
};

var renderAllPin = function (elements) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(renderPin(elements[i], i));
  }
  mapPins.appendChild(fragment);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var closePopup = function () {
  var popup = map.querySelector('.map__card');
  var popupClose = popup.querySelector('.popup__close');
  map.removeChild(popup);
  document.removeEventListener('keydown', onPopupEscPress);
  popup.removeEventListener('click', closePopup);
  popup.removeEventListener('keydown', closePopup);
};

var renderAdvert = function (advertData) {
  var advert = mapCardTemplate.cloneNode(true);

  var popupClose = advert.querySelector('.popup__close');
  popupClose.addEventListener('click', closePopup);
  popupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
  document.addEventListener('keydown', onPopupEscPress);

  var featuresHtml = '';
  var photosHtml = '';

  for (var i = 0; i < advertData.offer.features.length; i++) {
    featuresHtml += '<li class="popup__feature popup__feature--' + advertData.offer.features[i] + '"></li>';
  }

  for (var j = 0; j < advertData.offer.photos.length; j++) {
    photosHtml += '<img src="' + advertData.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
  }

  advert.querySelector('.popup__title').textContent = advertData.offer.title;
  advert.querySelector('.popup__text--address').textContent = advertData.offer.address;
  advert.querySelector('.popup__text--price').innerHTML = advertData.offer.price + '&#8381;/ночь';
  advert.querySelector('.popup__type').textContent = HOMES_MAP[advertData.offer.type];
  advert.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей';
  advert.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
  advert.querySelector('.popup__features').innerHTML = featuresHtml;
  advert.querySelector('.popup__description').textContent = advertData.offer.description;
  advert.querySelector('.popup__photos').innerHTML = photosHtml;
  advert.querySelector('.popup__avatar').src = advertData.author.avatar;

  return advert;
};

var showAdvertCard = function (parent, advert) {
  var mapCard = parent.querySelector('.map__card');
  if (mapCard) {
    closePopup();
  }

  parent.insertBefore(renderAdvert(advert), mapFiltersContainer);
};

var adverts = createArrayAdverts(ADVERT_COUNT);
toggleMapFormDisable(true);

var leftCoords = mainPin.offsetLeft + Math.round(mainPin.offsetWidth / 2);
var topCoords = mainPin.offsetTop + Math.round(mainPin.offsetHeight / 2);
formAdressInput.value = leftCoords + ', ' + topCoords;


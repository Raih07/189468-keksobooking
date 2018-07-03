'use strict';

(function () {
  var HOMES_MAP = {
    flat: {
      minPrice: 1000,
      rus: 'Квартира'
    },
    bungalo: {
      minPrice: 0,
      rus: 'Бунгало'
    },
    house: {
      minPrice: 5000,
      rus: 'Дом'
    },
    palace: {
      minPrice: 10000,
      rus: 'Дворец'
    }
  };

  var DEFAULT_AVATAR = 'img/avatars/default.png';

  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var onPopupEscPress = function (evt) {
    window.utils.checkEscEvent(evt, closeAdvert);
  };

  var onPopupCloseEnterPress = function (evt) {
    window.utils.checkEnterEvent(evt, closeAdvert);
  };

  var closeAdvert = function () {
    var popup = map.querySelector('.map__card');
    if (!popup) {
      return;
    }
    var popupClose = popup.querySelector('.popup__close');
    map.removeChild(popup);
    document.removeEventListener('keydown', onPopupEscPress);
    popupClose.removeEventListener('click', closeAdvert);
    popupClose.removeEventListener('keydown', onPopupCloseEnterPress);
  };

  var renderAdvert = function (advertData) {
    var advert = mapCardTemplate.cloneNode(true);

    var popupClose = advert.querySelector('.popup__close');
    popupClose.addEventListener('click', closeAdvert);
    popupClose.addEventListener('keydown', onPopupCloseEnterPress);
    document.addEventListener('keydown', onPopupEscPress);

    var featuresHtml = '';
    var photosHtml = '';

    if (advertData.offer.features.length !== 0) {
      advertData.offer.features.forEach(function (item) {
        featuresHtml += '<li class="popup__feature popup__feature--' + item + '"></li>';
      });
    }

    if (advertData.offer.photos.length !== 0) {
      advertData.offer.photos.forEach(function (item) {
        photosHtml += '<img src="' + item + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
      });
    }

    advert.querySelector('.popup__title').textContent = advertData.offer.title;
    advert.querySelector('.popup__text--address').textContent = advertData.offer.address;
    advert.querySelector('.popup__text--price').innerHTML = advertData.offer.price ? advertData.offer.price + '&#8381;/ночь' : '';
    advert.querySelector('.popup__type').textContent = HOMES_MAP[advertData.offer.type].rus;
    advert.querySelector('.popup__text--capacity').textContent = advertData.offer.rooms ? advertData.offer.rooms + ' комнаты для ' + advertData.offer.guests + ' гостей' : '';
    if (advertData.offer.checkin && advertData.offer.checkout) {
      advert.querySelector('.popup__text--time').textContent = 'Заезд после ' + advertData.offer.checkin + ', выезд до ' + advertData.offer.checkout;
    } else {
      advert.querySelector('.popup__text--time').display = 'none';
    }
    advert.querySelector('.popup__features').innerHTML = featuresHtml;
    advert.querySelector('.popup__description').textContent = advertData.offer.description;
    advert.querySelector('.popup__photos').innerHTML = photosHtml;
    advert.querySelector('.popup__avatar').src = advertData.author.avatar ? advertData.author.avatar : DEFAULT_AVATAR;

    return advert;
  };

  var showAdvertCard = function (parent, advert) {
    var mapCard = parent.querySelector('.map__card');
    if (mapCard) {
      closeAdvert();
    }

    parent.insertBefore(renderAdvert(advert), mapFiltersContainer);
  };

  window.advertCard = {
    showAdvertCard: showAdvertCard,
    closeAdvert: closeAdvert,
    homesMap: HOMES_MAP
  };

})();

'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var mapFiltersContainer = map.querySelector('.map__filters-container');

  var onPopupEscPress = function (evt) {
    window.utils.isEscEvent(evt, closeAdvert);
  };

  var onPopupCloseEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, closeAdvert);
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

    for (var i = 0; i < advertData.offer.features.length; i++) {
      featuresHtml += '<li class="popup__feature popup__feature--' + advertData.offer.features[i] + '"></li>';
    }

    for (var j = 0; j < advertData.offer.photos.length; j++) {
      photosHtml += '<img src="' + advertData.offer.photos[j] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">';
    }

    advert.querySelector('.popup__title').textContent = advertData.offer.title;
    advert.querySelector('.popup__text--address').textContent = advertData.offer.address;
    advert.querySelector('.popup__text--price').innerHTML = advertData.offer.price + '&#8381;/ночь';
    advert.querySelector('.popup__type').textContent = window.advertsData.homesMap[advertData.offer.type].rus;
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
      closeAdvert();
    }

    parent.insertBefore(renderAdvert(advert), mapFiltersContainer);
  };

  window.advertCard = {
    showAdvertCard: showAdvertCard,
    closeAdvert: closeAdvert
  };

})();

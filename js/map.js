'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var ANY_VALUE = 'any';

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');

  var filterField = document.querySelector('.map__filters');
  var houseFilter = filterField.querySelector('#housing-type');
  var priceFilter = filterField.querySelector('#housing-price');
  var roomsFilter = filterField.querySelector('#housing-rooms');
  var guestsFilter = filterField.querySelector('#housing-guests');
  var featuresFilters = filterField.querySelectorAll('.map__checkbox');

  var pins = [];

  var updatePins = function () {
    var filteredData = pins;
    window.pin.removePins();
    window.advertCard.closeAdvert();

    var filterValue = function (inputField, property) {
      if (inputField.value !== ANY_VALUE) {
        filteredData = filteredData.filter(function (item) {
          return item.offer[property].toString() === inputField.value;
        });
      }
      return filteredData;
    };

    var filterFeatures = function () {
      for (var i = 0; i < featuresFilters.length; i++) {
        if (featuresFilters[i].checked) {
          filteredData = filteredData.filter(function (item) {
            return item.offer.features.includes(featuresFilters[i].value);
          });
        }
      }
      return filteredData;
    };

    var filterPrice = function () {
      if (priceFilter.value !== ANY_VALUE) {
        filteredData = filteredData.filter(function (item) {
          var priceFilterValues = {
            'low': item.offer.price <= MIN_PRICE,
            'middle': item.offer.price >= MIN_PRICE && item.offer.price < MAX_PRICE,
            'high': item.offer.price >= MAX_PRICE
          };
          return priceFilterValues[priceFilter.value];
        });
      }
      return filteredData;
    };

    filterValue(houseFilter, 'type');
    filterValue(roomsFilter, 'rooms');
    filterValue(guestsFilter, 'guests');
    filterFeatures();
    filterPrice();

    window.pin.renderAllPins(filteredData);
  };

  filterField.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

  var onMainPinMouseUp = function () {
    window.form.toggleMapFormDisable(false);
    //window.backend.downloadData(window.pin.renderAllPins, window.showError);
    //window.pin.renderAllPins(pins);
    updatePins();
    window.form.setAddress(mainPin.offsetLeft, mainPin.offsetTop, false);
  };

  mainPin.addEventListener('mouseup', onMainPinMouseUp);

  var downloadOffers = function (data) {
    pins = data.slice();
  };

  window.backend.downloadData(downloadOffers, window.showError);
  window.form.toggleMapFormDisable(true);
  window.form.setAddress(mainPin.offsetLeft, mainPin.offsetTop, true);
})();

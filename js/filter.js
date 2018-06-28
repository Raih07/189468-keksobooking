'use strict';

(function () {
  var MIN_PRICE = 10000;
  var MAX_PRICE = 50000;

  var ANY_VALUE = 'any';

  var filterField = document.querySelector('.map__filters');
  var houseFilter = filterField.querySelector('#housing-type');
  var priceFilter = filterField.querySelector('#housing-price');
  var roomsFilter = filterField.querySelector('#housing-rooms');
  var guestsFilter = filterField.querySelector('#housing-guests');
  var featuresFilters = filterField.querySelectorAll('.map__checkbox');

  var updatePins = function () {
    var filteredData = pins;
    window.pin.removePins();
    window.advertCard.closeAdvert();

    var filterByValue = function (inputField, property) {
      if (inputField.value !== ANY_VALUE) {
        filteredData = filteredData.filter(function (item) {
          return item.offer[property].toString() === inputField.value;
        });
      }
      return filteredData;
    };

    var filterByFeatures = function () {
      for (var i = 0; i < featuresFilters.length; i++) {
        if (featuresFilters[i].checked) {
          filteredData = filteredData.filter(function (item) {
            return item.offer.features.indexOf(featuresFilters[i].value) >= 0;
          });
        }
      }
      return filteredData;
    };

    var filterByPrice = function () {
      if (priceFilter.value !== ANY_VALUE) {
        filteredData = filteredData.filter(function (item) {
          var priceFilterValues = {
            'low': item.offer.price < MIN_PRICE,
            'middle': item.offer.price >= MIN_PRICE && item.offer.price < MAX_PRICE,
            'high': item.offer.price >= MAX_PRICE
          };
          return priceFilterValues[priceFilter.value];
        });
      }
      return filteredData;
    };

    filterByValue(houseFilter, 'type');
    filterByValue(roomsFilter, 'rooms');
    filterByValue(guestsFilter, 'guests');
    filterByFeatures();
    filterByPrice();
    window.pin.renderAllPins(filteredData);
  };

  filterField.addEventListener('change', function () {
    window.utils.debounce(updatePins);
  });

})();

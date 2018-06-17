'use strict';

(function () {
  var ADVERT_COUNT = 8;
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 620;
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

  var titles = TITLES.slice();

  var getTitle = function (words) {
    var index = window.utils.getRandomIndex(0, words.length - 1);
    var title = words[index];

    words.splice(index, 1);

    return title;
  };

  var createAdvert = function (countAdvert) {
    var userAvatar = 'img/avatars/user0' + countAdvert + '.png';
    var advertTitle = getTitle(titles);
    var locationX = window.utils.getRandomIndex(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = window.utils.getRandomIndex(LOCATION_Y_MIN, LOCATION_Y_MAX);
    var advertAdress = locationX + ', ' + locationY;
    var advertPrice = window.utils.getRandomIndex(PRICE_MIN, PRICE_MAX);
    var advertType = HOME_TYPES[window.utils.getRandomIndex(0, HOME_TYPES.length - 1)];
    var roomCount = window.utils.getRandomIndex(ROOM_MIN, ROOM_MAX);
    var guestCount = window.utils.getRandomIndex(GUEST_MIN, GUEST_MAX);
    var checkinTime = TIMES[window.utils.getRandomIndex(0, TIMES.length - 1)];
    var checkoutTime = TIMES[window.utils.getRandomIndex(0, TIMES.length - 1)];
    var advertFeatures = window.utils.getRandomLengthArray(FEATURES);
    var sortedPhotos = window.utils.getRandomSortElements(PHOTOS);

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

  var adverts = createArrayAdverts(ADVERT_COUNT);

  window.advertsData = {
    adverts: adverts,
    homesMap: HOMES_MAP
  };
})();

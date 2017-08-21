'use strict';

var AVATAR_LIST = ['img/avatars/user{{01}}.png', 'img/avatars/user{{02}}.png', 'img/avatars/user{{03}}.png', 'img/avatars/user{{04}}.png', 'img/avatars/user{{05}}.png', 'img/avatars/user{{06}}.png', 'img/avatars/user{{07}}.png', 'img/avatars/user{{08}}.png' ];

var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPE_LIST = ['flat', 'house', 'bungalo'];

var TIME_LIST = ['12:00', '13:00', '14:00'];

var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adsList = [];

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomItemR = function (arr) {
  var number = Math.floor(Math.random() * arr.length);
  var item = arr[number];
  arr.splice(number, 1);
  return item;
};

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function getRandomNumberItem(arr) {
  var copyArr = arr.slice();
  var number = Math.floor(Math.random() * arr.length);
  var a = [];

  for (var i = 0; i < number; i++) {
    var random = Math.floor(Math.random() * arr.length);
    a[i] = copyArr[random];
    copyArr.splice(random, 1);
  }
  return a;
};

for (var i = 0; i < 8; i++) {
  adsList[i] = {
    author: {
      avatar: getRandomItemR(AVATAR_LIST)
    },
    offer: {
      title: getRandomItemR(TITLE_LIST),
      address: '{{location.x}}, {{location.y}}',
      price: getRandomInRange(1000, 1000000),
      type: getRandomItem(TYPE_LIST),
      rooms: getRandomInRange(1, 5),
      checkin: getRandomItem(TIME_LIST),
      checkout: getRandomItem(TIME_LIST),
      features: getRandomNumberItem(FEATURES_LIST),
      description: "",
      photos: []
    },
    location: {
      x: getRandomInRange(300, 900),
      y: getRandomInRange(100, 500)
    }
  }
};

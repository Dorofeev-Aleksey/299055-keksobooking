'use strict';

var AVATAR_LIST = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPE_LIST = ['flat', 'house', 'bungalo'];

var TIME_LIST = ['12:00', '13:00', '14:00'];

var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adsList = [];

function shuffle(a) {
  var j;
  var x;
  var i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

var getRandomItem = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomUniqueItem = function (arr) {
  var number = Math.floor(Math.random() * arr.length);
  var item = arr.splice(number, 1);
  return item;
};

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomLengthArr(arr) {
  var randomArrNumber = getRandomInRange(0, arr.lenght);
  shuffle(arr);
  return arr.slice(0, randomArrNumber);
}

var locationX = 0;
var locationY = 0;

for (var i = 0; i < 8; i++) {
  locationX = getRandomInRange(300, 900);
  locationY = getRandomInRange(100, 500);
  adsList[i] = {
    author: {
      avatar: getRandomUniqueItem(AVATAR_LIST)
    },
    offer: {
      title: getRandomUniqueItem(TITLE_LIST),
      address: locationX + ', ' + locationY,
      price: getRandomInRange(1000, 1000000),
      type: getRandomItem(TYPE_LIST),
      rooms: getRandomInRange(1, 5),
      quests: getRandomInRange(1, 10),
      checkin: getRandomItem(TIME_LIST),
      checkout: getRandomItem(TIME_LIST),
      features: getRandomLengthArr(FEATURES_LIST),
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  console.log(adsList);
}

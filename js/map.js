'use strict';

var KEY_ENTER = 13;
var KEY_ESCAPE = 27;

var AVATAR_LIST = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

var TITLE_LIST = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];

var TYPE_LIST = ['flat', 'house', 'bungalo'];

var TIME_LIST = ['12:00', '13:00', '14:00'];

var FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var adsList = [];

var ADS_NUMBER = 8;

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
  var randomArrNumber = getRandomInRange(0, arr.length);
  shuffle(arr);
  return arr.slice(0, randomArrNumber);
}

for (var i = 0; i < ADS_NUMBER; i++) {

  var locationX = getRandomInRange(300, 900);
  var locationY = getRandomInRange(100, 500);

  adsList[i] = {
    'author': {
      'avatar': getRandomUniqueItem(AVATAR_LIST)
    },

    'offer': {
      'title': getRandomUniqueItem(TITLE_LIST),
      'address': locationX + ', ' + locationY,
      'price': getRandomInRange(1000, 1000000),
      'type': getRandomItem(TYPE_LIST),
      'rooms': getRandomInRange(1, 5),
      'quests': getRandomInRange(1, 10),
      'checkin': getRandomItem(TIME_LIST),
      'checkout': getRandomItem(TIME_LIST),
      'features': getRandomLengthArr(FEATURES_LIST),
      'description': '',
      'photos': []
    },

    'location': {
      'x': locationX,
      'y': locationY
    }
  };
}

var tokyoMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
var dialog = document.querySelector('.dialog');
var dialogTitle = document.querySelector('.dialog__title');
var dialogPanel = document.querySelector('.dialog__panel');
var lodgeTemplate = document.querySelector('#lodge-template').content;

var renderPin = function (advert) {
  var pinElement = document.createElement('div');
  var img = '<img src="' + advert.author.avatar + '" class="rounded" width="40" height="40">';
  pinElement.className = 'pin';
  pinElement.style = 'left: ' + (advert.location.x - 28) + 'px; top: ' + (advert.location.y - 75) + 'px';
  pinElement.insertAdjacentHTML('afterbegin', img);
  pinElement.setAttribute('data-index', i);
  pinElement.setAttribute('tabindex', 0);
  return pinElement;
};

for (i = 0; i < adsList.length; i++) {
  fragment.appendChild(renderPin(adsList[i]));
}

tokyoMap.appendChild(fragment);

var renderAdvert = function (advert) {
  var lodgeElement = lodgeTemplate.cloneNode(true);
  var lodgeFeatures = lodgeElement.querySelector('.lodge__features');
  lodgeElement.querySelector('.lodge__title').textContent = advert.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = advert.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = advert.offer.price + '&#x20bd;/ночь';
  if (advert.offer.type === 'flat') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Квартира';
  } else if (advert.offer.type === 'bungalo') {
    lodgeElement.querySelector('.lodge__type').textContent = 'Бунгало';
  } else {
    lodgeElement.querySelector('.lodge__type').textContent = 'Квартира';
  }
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + advert.offer.guests + ' гостей в ' + advert.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  for (i = 0; i < advert.offer.features.length; i++) {
    var span = '<span class="feature__image feature__image--' + advert.offer.features[i] + '"></span>';
    lodgeFeatures.insertAdjacentHTML('afterbegin', span);
  }
  lodgeElement.querySelector('.lodge__description').textContent = advert.offer.description;
  return lodgeElement;
};

fragment.appendChild(renderAdvert(adsList[0]));
dialog.replaceChild(fragment, dialogPanel);
dialogTitle.querySelector('img').src = adsList[0].author.avatar;

var mainPin = document.querySelector('.pin__main');
var pin = document.querySelectorAll('.pin');
var lodgeCloseIcon = dialog.querySelector('.dialog__close');

var openDialogWindow = function () {
  dialog.classList.remove('hidden');
};

var closeDialogWindow = function () {
  dialog.classList.add('hidden');
};

var removePinActive = function () {
  for (i = 0; i <= adsList.length; i++) {
    pin[i].classList.remove('pin--active');
  }
};

var onCloseIconClick = function () {
  removePinActive();
  closeDialogWindow();
};

var onPinClick = function (evt) {
  removePinActive();
  var pinTarget = evt.currentTarget;
  pinTarget.classList.add('pin--active');
  if (pinTarget !== mainPin) {
    var pinIndex = pinTarget.getAttribute('data-index');
    // renderAdvert(pinIndex);
    dialog.replaceChild(renderAdvert(pinIndex), dialogPanel);
    openDialogWindow();
  } else {
    closeDialogWindow();
  }
};

var onPinPush = function (evt) {
  if (evt.keyCode === KEY_ENTER) {
    removePinActive();
    var pinTarget = evt.currentTarget;
    pinTarget.classList.add('pin--active');
    if (pinTarget !== mainPin) {
      var pinIndex = pinTarget.getAttribute('data-index');
      dialog.replaceChild(renderAdvert(pinIndex), dialogPanel);
      openDialogWindow();
    } else {
      closeDialogWindow();
    }
  }
};

var onCloseIconPush = function (evt) {
  if (evt.keyCode === KEY_ESCAPE) {
    removePinActive();
    closeDialogWindow();
  }
};

var onEscapePush = function (evt) {
  if (evt.keyCode === KEY_ESCAPE && (!dialog.classList.contains('hidden'))) {
    removePinActive();
    closeDialogWindow();
  }
};

for (i = 0; i <= adsList.length; i++) {
  pin[i].addEventListener('click', onPinClick);
  pin[i].addEventListener('keydown', onPinPush);
}

lodgeCloseIcon.addEventListener('click', onCloseIconClick);
lodgeCloseIcon.addEventListener('keydown', onCloseIconPush);
document.addEventListener('keydown', onEscapePush);

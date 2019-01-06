'use strict';

(function () {

  var slider = document.querySelector('.slider');
  var sliderList = slider.querySelector('.slider-list');
  var sliderBack = slider.querySelector('.slider-back');
  var sliderNext = slider.querySelector('.slider-next');
  var infoContacts = document.querySelector('.info-contacts');
  var smallMap = infoContacts.querySelector('.small-map');
  var bigMap = document.querySelector('.big-map');
  var btnMap = bigMap.querySelector('.btn-big-map');
  var btnContacts = infoContacts.querySelector('.btn-contacts');
  var feedback = document.querySelector('.feedback');
  var btnFeedbackClose = feedback.querySelector('.feedback-close');
  var overlay = document.querySelector('.overlay');
  var name = feedback.querySelector('#name');
  var email = feedback.querySelector('#email');
  var message = feedback.querySelector('#message');
  var feedbackForm = feedback.querySelector('.feedback-form');

// проверка на валидность формы
  var makeCheck = function (evt) {
    if (!name.value || !email.value || !message.value) {
      evt.preventDefault();
      var widthFeedback = feedback.offsetWidth;
      feedback.classList.remove('modal-error');
      widthFeedback = feedback.offsetWidth;
      feedback.classList.add('modal-error');
    } else {
      localStorage.setItem("login", name.value);
    }
  };

// закрытие карты
  var closeMap = function (evt) {
    evt.preventDefault();
    overlay.style.display = '';
    bigMap.classList.remove('open-popup');
    btnMap.removeEventListener('click', closeMap);
    btnMap.removeEventListener('keydown', pressKeyEnter);
    window.removeEventListener('keydown', pressKeyEsc);
  };

// открытие карты
  var openMap = function (evt) {
    evt.preventDefault();
    if (bigMap.classList.contains('open-popup')) {
      return;
    } else {
      overlay.style.display = 'block';
      bigMap.classList.add('open-popup');
      btnMap.addEventListener('click', closeMap);
      btnMap.addEventListener('keydown', pressKeyEnter);
      window.addEventListener('keydown', pressKeyEsc);
    }
  };

// закрытие окна обратной связи
  var closeFeedback = function (evt) {
    evt.preventDefault();
    overlay.style.display = '';
    feedback.classList.remove('open-popup');
    feedback.classList.remove('modal-error');
    feedbackForm.removeEventListener('submit', makeCheck);
    btnFeedbackClose.removeEventListener('click', closeFeedback);
    btnFeedbackClose.removeEventListener('keydown', pressKeyEnter);
    window.removeEventListener('keydown', pressKeyEsc);
  };

// открытие окна обратной связи
  var openFeedback = function (evt) {
    evt.preventDefault();
    if (feedback.classList.contains('open-popup')) {
      return;
    } else {
      overlay.style.display = 'block';
      feedback.classList.add('open-popup');
      feedbackForm.addEventListener('submit', makeCheck);
      btnFeedbackClose.addEventListener('click', closeFeedback);
      btnFeedbackClose.addEventListener('keydown', pressKeyEnter);
      window.addEventListener('keydown', pressKeyEsc);
    }
  };

// откритие и закрытие попапов при нажатии Enter
  var pressKeyEnter = function (evt) {
    if(evt.keyCode === 13) {
      switch (evt.target) {
        case smallMap:
          openMap(evt);
          break;
        case btnMap:
          closeMap(evt);
          break;
        case btnContacts:
          openFeedback(evt);
          break;
        case btnFeedbackClose:
          closeFeedback(evt);
          break;
      }
    }
  };

// закрытие попапов при нажатии Esc
  var pressKeyEsc = function (evt) {
    if(evt.keyCode === 27) {
      evt.preventDefault();
      closeMap(evt);
      closeFeedback(evt);
    }
  };

  smallMap.addEventListener('click', openMap);
  smallMap.addEventListener('keydown', pressKeyEnter);
  btnContacts.addEventListener('click', openFeedback);
  btnContacts.addEventListener('keydown', pressKeyEnter);

})();

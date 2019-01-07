'use strict';

(function () {

  var overlay = document.querySelector('.overlay');
  var productList = document.querySelector('.product-list');
  var buy = productList.querySelectorAll('.choice-buy');
  var popupOrder = document.querySelector('.popup-order');
  var continueShopping = popupOrder.querySelector('.continue-shopping');
  var btnCloseOrder = popupOrder.querySelector('.btn-close-order');
  var basket = document.querySelector('.basket-link');

  var closePopupOrder = function(evt) {
    evt.preventDefault();
    overlay.style.display = '';
    popupOrder.classList.remove('open-popup');
    [].forEach.call(buy, function(element){
      element.addEventListener('click', openPopupOrder);
    });
  };

  var openPopupOrder = function(evt) {
    evt.preventDefault();
    var basketText = basket.querySelector('span');
    overlay.style.display = 'block';
    popupOrder.classList.add('open-popup');
    basket.classList.add('basket-full');
    basketText.textContent = +basketText.textContent + 1;
    [].forEach.call(buy, function(element){
      element.removeEventListener('click', openPopupOrder);
    });
    continueShopping.addEventListener('click', closePopupOrder);
    btnCloseOrder.addEventListener('click', closePopupOrder);
  };

  [].forEach.call(buy, function(element){
    element.addEventListener('click', openPopupOrder);
  });

  if(document.querySelector('.logo:not([href])')) {

    var slider = document.querySelector('.slider');
    var sliderControl = slider.querySelector('.slider-control');
    var buttonsControl = sliderControl.querySelectorAll('.btn-slider-control');
    var sliderList = slider.querySelector('.slider-list');
    var sliderItems = sliderList.querySelectorAll('.slider-item');
    var sliderArrows = slider.querySelector('.slider-arrows');
    var sliderBack = slider.querySelector('.slider-back');
    var sliderNext = slider.querySelector('.slider-next');
    var infoContacts = document.querySelector('.info-contacts');
    var smallMap = infoContacts.querySelector('.small-map');
    var bigMap = document.querySelector('.big-map');
    var btnMap = bigMap.querySelector('.btn-big-map');
    var btnContacts = infoContacts.querySelector('.btn-contacts');
    var feedback = document.querySelector('.feedback');
    var btnFeedbackClose = feedback.querySelector('.feedback-close');
    var name = feedback.querySelector('#name');
    var email = feedback.querySelector('#email');
    var message = feedback.querySelector('#message');
    var feedbackForm = feedback.querySelector('.feedback-form');
    var service = document.querySelector('.service');
    var switchsList = service.querySelector('.service-switch');
    var switchs = service.querySelectorAll('.btn-switch');
    var serviceSlider = service.querySelectorAll('.service-slider-item');

    var removeClass = function (arrays, element, classActive) {
      [].forEach.call(arrays, function(el, index){
        el.classList.remove(classActive);
        element[index].classList.remove('btn-' + classActive);
      });
    };

  //переключение слайдов
  var switchSlide = function (evt) {
    var btnNumber = null;
    evt.preventDefault();
    if (evt.target.parentElement.classList.contains('btn-slider-active') || evt.target.parentElement.classList.contains('btn-service-active')) {
    return;
    } else if (evt.target.classList.contains('btn-slider-control')) {
      removeClass(sliderItems, buttonsControl, 'slider-active');
      btnNumber = +evt.target.firstElementChild.innerText.replace('Слайд ','');
      sliderItems[btnNumber - 1].classList.add('slider-active');
      evt.target.classList.add('btn-slider-active');
    } else if (evt.target.classList.contains('btn-switch')) {
      removeClass(serviceSlider, switchs, 'service-active');
      btnNumber = +evt.target.firstElementChild.innerText.replace('Слайд ','');
      serviceSlider[btnNumber - 1].classList.add('service-active');
      evt.target.classList.add('btn-service-active');
    } else if (evt.target.parentElement.classList.contains('slider-arrows')) {
      [].forEach.call(sliderItems, function(el, index){
        if(el.classList.contains('slider-active')) {
          btnNumber = index;
          el.classList.remove('slider-active');
          buttonsControl[index].classList.remove('btn-slider-active');
        }
      })
      if(evt.target === sliderBack) {
        if(btnNumber === 0) {
          btnNumber = sliderItems.length;
        }
        sliderItems[btnNumber - 1].classList.add('slider-active');
        buttonsControl[btnNumber - 1].classList.add('btn-slider-active');
      } else if (evt.target === sliderNext) {
        if(btnNumber === (sliderItems.length - 1)) {
          btnNumber = -1;
        }
        sliderItems[btnNumber + 1].classList.add('slider-active');
        buttonsControl[btnNumber + 1].classList.add('btn-slider-active');
      }
    }
  };

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

    sliderArrows.addEventListener('click', switchSlide);
    sliderControl.addEventListener('click', switchSlide);
    sliderControl.addEventListener('keydown', function(evt) {
      if(evt.keyCode === 13) {
        switchSlide(evt);
      }
    });
    switchsList.addEventListener('click', switchSlide);
    switchsList.addEventListener('keydown', function(evt) {
      if(evt.keyCode === 13) {
        switchSlide(evt);
      }
    });
    smallMap.addEventListener('click', openMap);
    smallMap.addEventListener('keydown', pressKeyEnter);
    btnContacts.addEventListener('click', openFeedback);
    btnContacts.addEventListener('keydown', pressKeyEnter);

  }

})();

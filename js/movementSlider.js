'use strict';

(function () {

  var buttonsField = document. querySelector('.min-max');
  var fieldWidth = buttonsField.clientWidth;
  var lineGreen = buttonsField.querySelector('.line-green');
  var btnMin = buttonsField.querySelector('.min');
  var btnMax = buttonsField.querySelector('.max');
  var inputsField = document.querySelector('.input-field');
  var inputs = inputsField.querySelectorAll('input');
  var inputMin = inputsField.querySelector('.input-min');
  var inputMax = inputsField.querySelector('.input-max');
  var inputMaxValue = +inputMax.defaultValue;
  var inputMinValue = +inputMin.defaultValue;
  var btnMaxLeft = btnMax.offsetLeft;
  var factor = inputMaxValue / btnMaxLeft;

  var resetInputValue = function (element) {
	  switch (element.className) {
		case 'input-min':
		  element.value = inputMinValue;
		  break;
		case 'input-max':
		  element.value = inputMaxValue;
		  break;
	  }
	};

	resetInputValue(inputMin);
	resetInputValue(inputMax);

//перемещение ползунка при изминении значения в input
var onMoveSliders = function (evt) {
  var target = evt.target;
  //проверка на вставляемые значения в input и запрет на пустой input
  if (target.validity.patternMismatch || !target.value) {
    switch (target.className) {
      case 'input-min':
        target.value = Math.round(btnMin.offsetLeft * factor);
        break;
      case 'input-max':
        target.value = Math.round(btnMax.offsetLeft * factor);
        break;
    }
  }
  switch (target.className) {
    case 'input-min':
      if (target.value < inputMinValue) {
        target.value = inputMinValue;
      } else if (+target.value > +inputMax.value) {
        target.value = inputMax.value;
      }
      btnMin.style.left = Math.round(target.value / factor) + 'px';
      lineGreen.style.marginLeft = Math.round(btnMin.offsetLeft) + 'px';
      btnMin.style.zIndex = 10;
      break;
    case 'input-max':
    if (target.value > Math.round((fieldWidth - btnMax.offsetWidth) * factor)) {
      target.value = Math.round((fieldWidth - btnMax.offsetWidth) * factor);
    } else if (+target.value < +inputMin.value) {
      target.value = inputMin.value;
    }
      btnMax.style.left = Math.round(target.value / factor) + 'px';
      btnMin.style.zIndex = 0;
      break;
  }
  lineGreen.style.width = (btnMax.offsetLeft - btnMin.offsetLeft) + 'px';
};

//устанавливает значение в input при перемещении ползунка
  var setRangeValue = function (target, val) {
    target.style.left = val + 'px';
    lineGreen.style.width = (btnMax.offsetLeft - btnMin.offsetLeft) + 'px';
    switch (target.className) {
      case 'min':
        inputMin.value = Math.round(val * factor);
        lineGreen.style.marginLeft = val + 'px';
        break;
      case 'max':
        inputMax.value = Math.round(val * factor);
        break;
    }
  };

//передвижение ползункка в форме при помощи мыши
  var onSlidersMovement = function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;
    var target = evt.target;
    var result = null;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = startCoords - moveEvt.clientX;
      startCoords = moveEvt.clientX;
      result = target.offsetLeft - shift;

      switch (target.className) {
        case 'min':
          btnMin.style.zIndex = 10;

          if(result < inputMinValue) {
            result = inputMinValue;
          } else if (result > btnMax.offsetLeft) {
            result = btnMax.offsetLeft;
          }
          setRangeValue(target, result);
          break;
        case 'max':
        btnMin.style.zIndex = 0;

        if(result < btnMin.offsetLeft) {
          result = btnMin.offsetLeft;
        } else if (result > (fieldWidth - target.offsetWidth)) {
          result = fieldWidth - target.offsetWidth;
        }
        setRangeValue(target, result);
          break;
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  //запрет на ввод не числовых значений в input
    var checksInput = function (evt) {
      var target = evt.target;
      if((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105)) {
        if(evt.keyCode !== 8 && evt.keyCode !== 9 && evt.keyCode !== 13 && evt.keyCode !== 27 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.keyCode !== 46) {
          evt.preventDefault();
          return;
        } else if (evt.keyCode === 13) {
          evt.preventDefault();
          onMoveSliders(evt);
          if(target.classList.contains('input-min')) {
            inputMax.focus();
          }
          target.blur();
        } else if (evt.keyCode === 27) {
          evt.preventDefault();
          target.blur();
        }
      }
    };

  [].forEach.call(inputs, function(element) {
    element.addEventListener('keydown', checksInput);
    element.addEventListener('blur', onMoveSliders);
  });
  btnMin.addEventListener('mousedown', onSlidersMovement);
  btnMax.addEventListener('mousedown', onSlidersMovement);

})();

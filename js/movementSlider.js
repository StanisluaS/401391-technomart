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
  var INPUT_MAX_VALUE = 30000;
  var INPUT_MAX_LEFT = 140;
  var factor = INPUT_MAX_VALUE / INPUT_MAX_LEFT;

  var resetInputValue = function (element) {
	  switch (element.name) {
		case 'min':
		  element.value = 0;
		  break;
		case 'max':
		  element.value = INPUT_MAX_VALUE;
		  break;
	  }
	};

	resetInputValue(inputMin);
	resetInputValue(inputMax);

//запрет на ввод не числовых значений в input
  var checksInput = function (evt) {
    var target = evt.target;
    if((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105)) {
      if(evt.keyCode !== 8 && evt.keyCode !== 9 && evt.keyCode !== 27 && evt.keyCode !== 37 && evt.keyCode !== 39 && evt.keyCode !== 46) {
        evt.preventDefault();
        return;
      }
    }
  };

//перемещение ползунка при изминении значения в input
var onMoveSliders = function (evt) {
  var target = evt.target;
  //проверка на вставляемые значения в input
  if (target.validity.patternMismatch) {
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
      if (target.value < 0) {
        target.value = 0;
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

          if(result < 0) {
            result = 0;
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

  [].forEach.call(inputs, function(element) {
    element.addEventListener('keydown', checksInput);
    element.addEventListener('blur', onMoveSliders);
  });
  btnMin.addEventListener('mousedown', onSlidersMovement);
  btnMax.addEventListener('mousedown', onSlidersMovement);

})();

'use strict';

const DATA = {
  whichSite: ['landing', 'multiPage', 'onlineStore'],
  price: [4000, 8000, 26000],
  desktopTemplates: [50, 40, 30],
  adapt: 20,
  mobileTemplates: 15,
  editable: 10,
  metrikaYandex: [500, 1000, 2000],
  analyticsGoogle: [850, 1350, 3000],
  sendOrder: 500,
  deadlineDay: [[2, 7], [3, 10], [7, 14]],
  deadlinePercent: [20, 17, 15]
}

const startButton = document.querySelector('.start-button'),
      firstScreen = document.querySelector('.first-screen'),
      mainForm = document.querySelector('.main-form'),
      formCalculate = document.querySelector('.form-calculate'),
      endButton = document.querySelector('.end-button'),
      total = document.querySelector('.total'),
      fastRange = document.querySelector('.fast-range'),
      totalPriceSum = document.querySelector('.total_price__sum');


// console.log(formCalculate.elements[8]);
formCalculate.elements[8].disabled = !formCalculate.elements[8].disabled



/* === Функции === */



function showElem(elem) {
  elem.style.display = 'block';
}


function hideElem(elem) {
  elem.style.display = 'none';
}


function priceCalculation(elem) {
  let result = 0,
      index = 0,
      options = [];

  if (elem.name === 'whichSite') {
    for (const item of formCalculate.elements) {
      if (item.type === 'checkbox') {
        item.checked = false;
      }
    }
    hideElem(fastRange);
  }

  for (const item of formCalculate.elements) {
    if (item.id === 'adapt' && item.checked) {
      formCalculate.elements[8].disabled = false;
    } else if (item.id === 'adapt' && !item.checked) {
      for (const elem of formCalculate.elements) {
        if (elem.value === 'mobileTemplates' && elem.checked) {
          result -= DATA.price[0] * DATA.mobileTemplates / 100;
        }
      }
      formCalculate.elements[8].disabled = !formCalculate.elements[8].disabled
    }
  }

  for (const item of formCalculate.elements) {
    if (item.name === 'whichSite' && item.checked) {
      index = DATA.whichSite.indexOf(item.value);
    } else if (item.classList.contains('calc-handler') && item.checked) {
      options.push(item.value);
    }
  }

  options.forEach( (key) => {
    if (typeof(DATA[key]) === 'number') {
      if (key === 'sendOrder') {
        result += DATA[key];
      } else {
        result += DATA.price[index] * DATA[key] / 100;
      }
    } else {
      if (key === 'desktopTemplates') {
        result += DATA.price[index] * DATA[key][index] / 100;
      } else {
        result += DATA[key][index];
      }
    }
  });

  result += DATA.price[index];

  totalPriceSum.textContent = result;
}


function handlerCallBackForm(event) {

  const target = event.target;

  if (target.classList.contains('want-faster')) {
    target.checked ? showElem(fastRange) : hideElem(fastRange);
  }

  if (target.classList.contains('calc-handler')) {
    priceCalculation(target);
  }

}



/* === События === */



startButton.addEventListener('click', () => {
  showElem(mainForm);
  hideElem(firstScreen);
});

endButton.addEventListener('click', () => {

  for (const elem of formCalculate.elements) {
    if (elem.tagName === 'FIELDSET')
      hideElem(elem);
  }

  showElem(total);

});

formCalculate.addEventListener('change', handlerCallBackForm);
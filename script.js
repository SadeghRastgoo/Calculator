"use strict";

//TODO: Implement history
// TODO: Implement calculator

const body = document.querySelector("body");
const inputA = document.querySelector(".inputA");
const inputB = document.querySelector(".inputB");
const cKey = document.querySelector(".cKey");
const undoKey = document.querySelector(".undoKey");
const percentageKey = document.querySelector(".percentageKey");
const divideKey = document.querySelector(".divideKey");
const mutiplyKey = document.querySelector(".mutiplyKey");
const minusKey = document.querySelector(".minusKey");
const plusKey = document.querySelector(".plusKey");
const powerKey = document.querySelector(".powerKey");
const resultKey = document.querySelector(".resultKey");

// Switch Theme Buttons
const btnLight = document.querySelector(".btn-light");
const btnDark = document.querySelector(".btn-dark");

const switchThemeFunc = function () {
  const turnLightMode = function () {
    body.classList.add("light-mode");
    btnDark.classList.remove("active-theme");
    btnLight.classList.add("active-theme");
  };
  const turnDarkMode = function () {
    body.classList.remove("light-mode");
    btnDark.classList.add("active-theme");
    btnLight.classList.remove("active-theme");
  };
  if (btnDark.classList.contains("active-theme")) {
    turnLightMode();
  } else {
    turnDarkMode();
  }
};
btnLight.addEventListener("click", switchThemeFunc);
btnDark.addEventListener("click", switchThemeFunc);

resultKey.addEventListener("click", function () {
  const numbers = inputA.value.split("÷");
  let calc = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    calc /= numbers[i];
  }

  inputB.value = calc - Math.floor(calc) !== 0 ? calc.toFixed(2) : calc;
});

const divideCalc = function () {
  inputA.value = inputA.value + "÷";
  inputA.classList.remove("activeInput");
  inputB.classList.add("activeInput");
};

percentageKey.addEventListener("click", divideCalc);

undoKey.addEventListener("click", function () {
  const n = inputA.value;
  const nSplit = n.split("");
  let concatNums = "";
  for (let i = 0; i < nSplit.length - 1; i++) {
    concatNums += nSplit[i];
  }
  inputA.value = concatNums;
});

cKey.addEventListener("click", function () {
  inputA.value = "";
  inputB.value = "";
  if (!inputA.classList.contains("activeInput"))
    inputB.classList.remove("activeInput");
  inputA.classList.add("activeInput");
});

const numFunc = function (number) {
  inputA.value = inputA.value + number;
};

function setInputFilter(textbox, inputFilter) {
  [
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mouseup",
    "select",
    "contextmenu",
    "drop",
  ].forEach(function (event) {
    textbox.addEventListener(event, function () {
      if (inputFilter(this.value)) {
        this.oldValue = this.value;
        this.oldSelectionStart = this.selectionStart;
        this.oldSelectionEnd = this.selectionEnd;
      } else if (this.hasOwnProperty("oldValue")) {
        this.value = this.oldValue;
        this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
      } else {
        this.value = "";
      }
    });
  });
}

setInputFilter(document.getElementById("input"), function (value) {
  return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
});

function currentTime() {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh === 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  let time = hh + ":" + mm + ":" + ss + " " + session;

  document.getElementById("clock").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}

currentTime();

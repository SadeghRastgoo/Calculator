"use strict";

// Main elements
const body = document.querySelector("body");
const historyBtn = document.querySelector(".history-icon");
const backdropEl = document.querySelector(".backdrop");
const historyEmptyEl = document.querySelector(".app-history__empty");
const historyEl = document.querySelector(".app__history");
const phoneEl = document.querySelector(".mobile");
const appAlertEl = document.querySelector(".app__alert");
const notificationEl = document.querySelector(".notification");
const notificationCloseBtn = document.querySelector(".notification__close");
const zoomMobileBtn = document.querySelector(".size-btn__zoom");
const zoomoutMobileBtn = document.querySelector(".size-btn__zoomout");

// Input elements
const inputA = document.querySelector(".inputA");
const inputB = document.querySelector(".inputB");

// Main keys
const acEl = document.querySelector(".ac");
const delEl = document.querySelector(".del");
const pmEl = document.querySelector(".pm");
const divisionEl = document.querySelector(".division");
const multiplicationEl = document.querySelector(".multiplication");
const additionEl = document.querySelector(".addition");
const subtractionEl = document.querySelector(".subtraction");
const percentEl = document.querySelector(".percent");
const decimalEl = document.querySelector(".decimal");
const infinityEl = document.querySelector(".infinity");
const equalEl = document.querySelector(".equal");

// Number keys
const number0El = document.querySelector(".number-0");
const number1El = document.querySelector(".number-1");
const number2El = document.querySelector(".number-2");
const number3El = document.querySelector(".number-3");
const number4El = document.querySelector(".number-4");
const number5El = document.querySelector(".number-5");
const number6El = document.querySelector(".number-6");
const number7El = document.querySelector(".number-7");
const number8El = document.querySelector(".number-8");
const number9El = document.querySelector(".number-9");
const numberElsArr = [
  number0El,
  number1El,
  number2El,
  number3El,
  number4El,
  number5El,
  number6El,
  number7El,
  number8El,
  number9El,
];

// Variables in memory
let valueStrInMemory = null;
let operatorInMemory = null;

// Functionalities
const getValueAsStr = () => inputA.value.split(",").join("");

const getValueAsNum = () => parseFloat(getValueAsStr());

const checkLengthOfNum = () => {
  if (getValueAsStr().length > 10) {
    inputA.classList.add("text-xs");
  } else if (getValueAsStr().length > 6) {
    inputA.classList.add("text-sm");
  } else {
    inputA.classList.remove("text-sm");
    inputA.classList.remove("text-xs");
  }
};

const checkLengthOfInputB = () => {
  if (inputB.value.length > 28) {
    inputB.classList.add("b-text-xs");
  } else if (inputB.value.length > 18) {
    inputB.classList.add("b-text-sm");
  } else {
    inputB.classList.remove("b-text-sm");
    inputB.classList.remove("b-text-xs");
  }
};

const limitLengthOfNum = () => {
  if (getValueAsStr().length > 10) {
    appAlertEl.classList.add("app__alert--active");
    return false;
  } else {
    appAlertEl.classList.remove("app__alert--active");
    return true;
  }
};

const setInHistory = (result) => {
  if (!historyEmptyEl.classList.contains("d-none"))
    historyEmptyEl.classList.add("d-none");
  const newEl = document.createElement("div");
  newEl.innerHTML = `<div class="history-item">
    <span class="history-item__result">${result}</span>
    <time class="history-item__time">${
      document.querySelector(".status-bar__time").textContent
    }</time>
  </div>`;
  historyEl.insertBefore(newEl, historyEl.firstChild);
};

let inputBStr = "";

const printToInputB = (str) => {
  const operatorsObj = {
    addition: "+",
    subtraction: "-",
    multiplication: "*",
    division: "/",
    percentage: "%",
    decimal: ".",
    equal: "=",
  };
  if (str === "format") {
    inputBStr = "";
  } else if (str === "delete") {
    inputBStr = inputBStr.slice(0, -1);
  } else {
    inputBStr += operatorsObj[str] || str;
    if (
      inputBStr[inputBStr.length - 1] === operatorsObj[str] &&
      inputBStr[inputBStr.length - 2] === operatorsObj[str]
    ) {
      inputBStr = inputBStr.slice(0, -1);
    }
  }
  inputB.value = inputBStr;
  checkLengthOfInputB();
};

const setStrAsValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === ".") {
    inputA.value += ".";
    return;
  }
  const [wholeNumStr, decimalStr] = valueStr.split(".");
  if (decimalStr) {
    inputA.value = parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    inputA.value = parseFloat(wholeNumStr).toLocaleString();
  }

  checkLengthOfNum();
};

const handleNumberClick = (numStr) => {
  const currentValueStr = getValueAsStr();
  if (currentValueStr === "0") {
    setStrAsValue(numStr);
  } else {
    setStrAsValue(currentValueStr + numStr);
  }
};

const getResultOfOperationAsStr = () => {
  const currentValueNum = getValueAsNum();
  const valueNumInMemory = parseFloat(valueStrInMemory);
  let newValueNum;
  if (operatorInMemory === "addition") {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorInMemory === "subtraction") {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorInMemory === "multiplication") {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorInMemory === "division") {
    newValueNum = valueNumInMemory / currentValueNum;
  }
  return newValueNum.toString();
};

const handleOperatorClick = (operation) => {
  const currentValueStr = getValueAsStr();

  if (!valueStrInMemory) {
    valueStrInMemory = currentValueStr;
    operatorInMemory = operation;
    setStrAsValue("0");
    return;
  }

  valueStrInMemory = getResultOfOperationAsStr();
  operatorInMemory = operation;
  setStrAsValue("0");
};

// Add event listeners to keys and buttons
acEl.addEventListener("click", () => {
  printToInputB("format");
  setStrAsValue("0");
  valueStrInMemory = null;
  operatorInMemory = null;
  limitLengthOfNum();
});

delEl.addEventListener("click", () => {
  const valueAsStr = getValueAsStr();
  const valueAsStrSliced = valueAsStr.slice(0, -1);
  if (valueAsStrSliced[valueAsStrSliced.length - 1] === ".") {
    setStrAsValue(valueAsStrSliced.slice(0, -1));
    printToInputB("delete");
    printToInputB("delete");
  } else if (valueAsStr.length === 0) {
    printToInputB("delete");
    setStrAsValue("0");
  } else if (valueAsStr.length === 1) {
    setStrAsValue("0");
    const inputBArr = [...inputB.value];
    if (isNaN(inputBArr[inputBArr.length - 2])) printToInputB("delete");
  } else {
    printToInputB("delete");
    setStrAsValue(valueAsStrSliced);
  }
  limitLengthOfNum();
});

pmEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const currentValueStr = getValueAsStr();

  if (currentValueStr === "-0") {
    setStrAsValue("0");
    return;
  }
  if (currentValueNum >= 0) {
    setStrAsValue("-" + currentValueStr);
  } else {
    setStrAsValue(currentValueStr.substring(1));
  }
});

percentEl.addEventListener("click", () => {
  const currentValueNum = getValueAsNum();
  const newValueNum = currentValueNum / 100;
  setStrAsValue(newValueNum.toString());
  valueStrInMemory = null;
  operatorInMemory = null;
});

// Add event listeners to operators
additionEl.addEventListener("click", () => {
  handleOperatorClick("addition");
  printToInputB("addition");
});
subtractionEl.addEventListener("click", () => {
  handleOperatorClick("subtraction");
  printToInputB("subtraction");
});
multiplicationEl.addEventListener("click", () => {
  handleOperatorClick("multiplication");
  printToInputB("multiplication");
});
divisionEl.addEventListener("click", () => {
  handleOperatorClick("division");
  printToInputB("division");
});
equalEl.addEventListener("click", () => {
  if (valueStrInMemory) {
    const newValueAsStr = getResultOfOperationAsStr();
    setStrAsValue(getResultOfOperationAsStr());
    printToInputB("=" + newValueAsStr);
    setInHistory(newValueAsStr);
    valueStrInMemory = null;
    operatorInMemory = null;
  }
});

// Add event listeners to numbers and decimal
numberElsArr.forEach((el) => {
  el.addEventListener("click", () => {
    if (limitLengthOfNum() === true) {
      handleNumberClick(el.innerText.toString());
      printToInputB(el.innerText.toString());
    }
  });
});
decimalEl.addEventListener("click", () => {
  const currentValueStr = getValueAsStr();
  if (!currentValueStr.includes(".")) {
    setStrAsValue(currentValueStr + ".");
    printToInputB("decimal");
  }
});
infinityEl.addEventListener("click", () => {
  setStrAsValue("0");
  valueStrInMemory = null;
  operatorInMemory = null;
  setStrAsValue("90071992547");
  printToInputB("90071992547");
});

// History
historyBtn.addEventListener("click", () => {
  historyEl.classList.toggle("app__history--active");
  backdropEl.classList.remove("d-none");
});
backdropEl.addEventListener("click", () => {
  backdropEl.classList.add("d-none");
  historyEl.classList.toggle("app__history--active");
});

// Switch Theme Buttons
const btnLight = document.querySelector(".btn-light");
const btnDark = document.querySelector(".btn-dark");

const theme = localStorage.getItem("theme");

const switchThemeFunc = function () {
  const turnLightMode = function () {
    body.classList.add("light-mode");
    btnDark.classList.remove("active-theme");
    btnLight.classList.add("active-theme");
    localStorage.setItem("theme", "light-mode");
  };
  const turnDarkMode = function () {
    body.classList.remove("light-mode");
    btnDark.classList.add("active-theme");
    btnLight.classList.remove("active-theme");
    localStorage.setItem("theme", "dark-mode");
  };
  if (btnDark.classList.contains("active-theme")) {
    turnLightMode();
  } else {
    turnDarkMode();
  }
};
btnLight.addEventListener("click", switchThemeFunc);
btnDark.addEventListener("click", switchThemeFunc);

if (theme) {
  body.classList.add(theme);
  if (body.classList.contains("light-mode")) {
    switchThemeFunc();
  }
}

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

  document.getElementById("barClock").innerText = time;
  let t = setTimeout(function () {
    currentTime();
  }, 1000);
}
currentTime();

const zoomFunctionality = (typeOfZoom) => {
  if (typeOfZoom === "out") {
    if (
      !phoneEl.classList.contains("zoom-75") &&
      !phoneEl.classList.contains("zoom-125")
    ) {
      phoneEl.classList.add("zoom-75");
    } else if (phoneEl.classList.contains("zoom-125")) {
      phoneEl.classList.remove("zoom-125");
    }
  } else if (typeOfZoom === "in") {
    if (
      !phoneEl.classList.contains("zoom-75") &&
      !phoneEl.classList.contains("zoom-125")
    ) {
      phoneEl.classList.add("zoom-125");
    } else if (phoneEl.classList.contains("zoom-75")) {
      phoneEl.classList.remove("zoom-75");
    }
  }
};

zoomMobileBtn.addEventListener("click", () => {
  zoomFunctionality("in");
});
zoomoutMobileBtn.addEventListener("click", () => {
  zoomFunctionality("out");
});

setTimeout(() => {
  openNotification();
}, 4000);

const openNotification = () => {
  notificationEl.classList.add("notification--active");
  setTimeout(() => {
    closeNotification();
  }, 6000);
};
const closeNotification = () => {
  notificationEl.classList.remove("notification--active");
};

notificationCloseBtn.addEventListener("click", closeNotification);

"use strict";

const title = document.querySelector("h1");
const buttonPlus = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const inputRange = document.querySelector(".rollback input");
const inputRangeValue = document.querySelector(".rollback .range-value");

const startBtn = document.querySelectorAll(".handler_btn")[0];

let resetBtn = document.getElementById("reset");

const leftSide = document.querySelector(".main-controls") || document;

// результаты
const total = document.getElementsByClassName("total-input")[0];
const totalCount = document.getElementsByClassName("total-input")[1];
const totalCountOther = document.getElementsByClassName("total-input")[2];
const totalFullCount = document.getElementsByClassName("total-input")[3];
const totalCountRollback = document.getElementsByClassName("total-input")[4];

// ===== helpers (СТРЕЛОЧНЫЕ) =====
const getScreens = () => document.querySelectorAll(".screen");

const setDisabledLeft = (isDisabled) => {
  leftSide
    .querySelectorAll("input[type=text], select")
    .forEach((el) => (el.disabled = isDisabled));
};

const clearTextInputsLeft = () => {
  leftSide
    .querySelectorAll("input[type=text]")
    .forEach((el) => (el.value = ""));
};

const clearSelectsLeft = () => {
  leftSide.querySelectorAll("select").forEach((el) => (el.value = ""));
};

const clearCheckboxesLeft = () => {
  leftSide
    .querySelectorAll('input[type="checkbox"]')
    .forEach((el) => (el.checked = false));
};

const clearTotals = () => {
  total.value = "";
  totalCount.value = "";
  totalCountOther.value = "";
  totalFullCount.value = "";
  totalCountRollback.value = "";
};

const ensureResetButton = () => {
  if (resetBtn) return resetBtn;

  resetBtn = document.createElement("button");
  resetBtn.type = "button";
  resetBtn.id = "reset";
  resetBtn.className = "handler_btn";
  resetBtn.textContent = "Сброс";
  resetBtn.style.display = "none";

  startBtn.after(resetBtn);

  return resetBtn;
};

// ===== APP =====
const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  servicePricesPercent: 0,
  servicePricesNumber: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  servicesPercent: {},
  servicesNumber: {},

  init: function () {
    this.addTitle();

    const rb = ensureResetButton();

    startBtn.addEventListener("click", this.start.bind(this));
    rb.addEventListener("click", this.reset.bind(this));
    buttonPlus.addEventListener("click", this.addScreenBlock.bind(this));

    inputRange.addEventListener("input", () => {
      inputRangeValue.textContent = `${inputRange.value}%`;
      this.rollback = +inputRange.value;
    });

    // на старте reset скрыта
    rb.style.display = "none";
  },

  addTitle: function () {
    document.title = title ? title.textContent : document.title;
  },

  start: function () {
    if (!this.checkScreens()) {
      alert("Заполните все экраны");
      return;
    }

    this.clearData();

    this.addScreens();
    this.addServices();
    this.addPrices();
    this.showResult();

    setDisabledLeft(true);
    this.toggleButtons(true);
  },

  checkScreens: function () {
    const screens = getScreens();

    return [...screens].every((screen) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");

      return (
        select &&
        input &&
        select.value !== "" &&
        input.value !== "" &&
        +input.value > 0
      );
    });
  },

  clearData: function () {
    this.screens = [];
    this.screenPrice = 0;
    this.servicePricesPercent = 0;
    this.servicePricesNumber = 0;
    this.fullPrice = 0;
    this.servicePercentPrice = 0;
    this.servicesPercent = {};
    this.servicesNumber = {};
  },

  toggleButtons: function (showReset) {
    const rb = ensureResetButton();

    if (showReset) {
      startBtn.style.display = "none";
      rb.style.display = "inline-block";
    } else {
      startBtn.style.display = "inline-block";
      rb.style.display = "none";
    }
  },

  showResult: function () {
    total.value = this.screenPrice;
    totalCountOther.value =
      this.servicePricesPercent + this.servicePricesNumber;
    totalFullCount.value = this.fullPrice;
    totalCountRollback.value = this.servicePercentPrice;
  },

  addScreens: function () {
    const screens = getScreens();

    screens.forEach((screen, index) => {
      const select = screen.querySelector("select");
      const input = screen.querySelector("input");
      const selectName = select.options[select.selectedIndex].textContent;

      this.screens.push({
        id: index,
        name: selectName,
        price: +select.value * +input.value,
        count: +input.value,
      });
    });
  },

  addServices: function () {
    otherItemsPercent.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector("label");
      const input = item.querySelector('input[type="text"]');

      if (check && label && input && check.checked && input.value !== "") {
        this.servicesPercent[label.textContent] = +input.value;
      }
    });

    otherItemsNumber.forEach((item) => {
      const check = item.querySelector('input[type="checkbox"]');
      const label = item.querySelector("label");
      const input = item.querySelector('input[type="text"]');

      if (check && label && input && check.checked && input.value !== "") {
        this.servicesNumber[label.textContent] = +input.value;
      }
    });
  },

  addScreenBlock: function () {
    const screens = getScreens();
    if (!screens.length) return;

    const clone = screens[0].cloneNode(true);
    const select = clone.querySelector("select");
    const input = clone.querySelector("input");
    if (select) select.value = "";
    if (input) input.value = "";

    screens[screens.length - 1].after(clone);
  },

  addPrices: function () {
    let totalScreensCount = 0;

    this.screens.forEach((screen) => {
      this.screenPrice += screen.price;
      totalScreensCount += screen.count;
    });

    for (const key in this.servicesNumber) {
      this.servicePricesNumber += this.servicesNumber[key];
    }

    for (const key in this.servicesPercent) {
      this.servicePricesPercent +=
        this.screenPrice * (this.servicesPercent[key] / 100);
    }

    this.fullPrice =
      this.screenPrice + this.servicePricesNumber + this.servicePricesPercent;

    this.servicePercentPrice =
      this.fullPrice - this.fullPrice * (this.rollback / 100);

    totalCount.value = totalScreensCount;
  },

  reset: function () {
    this.toggleButtons(false);
    const screens = getScreens();
    screens.forEach((screen, i) => {
      if (i !== 0) screen.remove();
    });
    clearTextInputsLeft();
    clearSelectsLeft();
    clearCheckboxesLeft();
    setDisabledLeft(false);
    clearTotals();
    this.clearData();
  },
};

appData.init();

"use strict";

const title = document.getElementsByTagName("h1")[0];

const handlerButtons = document.getElementsByClassName("handler_btn");
const countBtn = handlerButtons[0]; // Рассчитать
const resetBtn = handlerButtons[1]; // Сброс

const plusBtn = document.querySelector(".screen-btn");

const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");

const rollbackInput = document.querySelector('.rollback input[type="range"]');

const rangeValue = document.querySelector(".rollback .range-value");

const totalInputs = document.getElementsByClassName("total-input");
const totalPrice = totalInputs[0];
const totalCount = totalInputs[1];
const totalCountOther = totalInputs[2];

let screens = document.querySelectorAll(".screen");

"use strict";

let title;
let screens;
let screenPrice;
let adaptive;
let rollback = 10; // 10%
let allServicePrices;
let fullPrice;
let servicePercentPrice;
let service1;
let service2;

// Функция, которая запрашивает у пользователя число,
// убирает пробелы, проверяет корректность и возвращает именно число.
const getValidNumber = function (message) {
  let value;

  do {
    value = prompt(message);
    if (value === null) return null; // если пользователь нажал "Отмена"

    value = value.trim(); // удаляем пробелы
  } while (value === "" || isNaN(value)); // повторяем, пока не введено число

  return Number(value); // возвращаем число, не строку
};

// Функция, задающая основные вопросы пользователю
const asking = function () {
  title = prompt("Как называется ваш проект?", "Калькулятор верстки");
  screens = prompt(
    "Какие типы экранов нужно разработать? (например: Простые, Сложные, Интерактивные)"
  );

  screenPrice = getValidNumber("Сколько будет стоить данная работа?");

  if (screenPrice === null) {
    alert("Ввод отменён пользователем.");
    return;
  }

  adaptive = confirm("Нужен ли адаптив на сайте?");
};

// Функция, которая запрашивает доп. услуги и их стоимость
const getAllServicePrices = function () {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    let service = prompt("Какой дополнительный тип услуги нужен?");
    let price = getValidNumber("Сколько это будет стоить?");

    if (price === null) {
      alert("Ввод отменён пользователем.");
      return;
    }

    sum += price;

    if (i === 0) service1 = service;
    else service2 = service;
  }

  return sum;
};

const showTypeOf = function (variable) {
  console.log(variable, typeof variable);
};

const getFullPrice = function () {
  return screenPrice + allServicePrices;
};

const getServicePercentPrices = function () {
  return fullPrice - fullPrice * (rollback / 100);
};

const getTitle = function () {
  return title.trim()[0].toUpperCase() + title.trim().substr(1).toLowerCase;
};

const gerRollbackMessage = function (price) {
  if (price >= 3000) {
    return "Даём скидку в 10%";
  } else if (price >= 15000 && price < 30000) {
    return "Даём скидку в 5%";
  } else if (price >= 0 && price < 15000) {
    return "Скидка не предусмотрена";
  } else {
    return "Что-то пошло не так";
  }
};

asking();
allServicePrices = getAllServicePrices();
fullPrice = getFullPrice();
servicePercentPrice = getServicePercentPrices();
title = getTitle();

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

console.log("allServicePrices", allServicePrices);

console.log(gerRollbackMessage(fullPrice));
console.log(typeof title);
console.log(typeof screenPrice);
console.log(typeof adaptive);

console.log(screens.length);
console.log(servicePercentPrice);

console.log(
  "Стоимость верстки экранов " + screenPrice + "рубли",
  "стоимость разработки сайта" + fullPrice + "рубли"
);

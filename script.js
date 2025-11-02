"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt(
  "Какие типы экранов нужно разработать? (например: Простые, Сложные, Интерактивные)"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");
// вычисление итоговой стоимости
// откат посреднику
let rollback = 30; // 30%

// 1) Функция возвращает сумму дополнительных услуг
const getAllServicePrices = function () {
  return servicePrice1 + servicePrice2;
};
let allServicePrices = getAllServicePrices();

// 2) Функция возвращает общую стоимость верстки и услуг
function getFullPrice() {
  return screenPrice + getAllServicePrices();
}

let fullPrice = getFullPrice();

// 3) Функция форматирует title
function getTitle() {
  let trimmed = title.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

// 4) Функция вычисляет цену с учётом отката посреднику
function getServicePercentPrices() {
  return Math.ceil(fullPrice - (fullPrice * rollback) / 100);
}
let servicePercentPrice = getAllServicePrices();

// 5) Функция показывает тип данных
function showTypeOf(variable) {
  console.log(typeof variable);
}

/* Очистка консоли и итоговый вывод */
console.clear();

console.log(`Название проекта: ${getTitle()}`);
console.log(`Типы экранов для разработки: ${screens}`);
console.log(`Стоимость верстки: ${screenPrice} руб.`);
console.log(`Стоимость дополнительных услуг: ${allServicePrices} руб.`);
console.log(`Итоговая стоимость работы: ${fullPrice} руб.`);
console.log(`Стоимость без отката посреднику: ${servicePercentPrice} руб.`);

showTypeOf(title);
showTypeOf(screenPrice);
showTypeOf(adaptive);

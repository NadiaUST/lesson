"use strict";

let title = prompt("Как называется ваш проект?");
let screens = prompt(
  "Какие типы экранов нужно разработать? (например: Простые, Сложные, Интерактивные)"
);
let screenPrice = +prompt("Сколько будет стоить данная работа?");
let adaptive = confirm("Нужен ли адаптив на сайте?");

// дополнительные услуги
let service1 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice1 = +prompt("Сколько это будет стоить?");
let service2 = prompt("Какой дополнительный тип услуги нужен?");
let servicePrice2 = +prompt("Сколько это будет стоить?");

// вычисление итоговой стоимости
let fullPrice = screenPrice + servicePrice1 + servicePrice2;
console.log("Итоговая стоимость работы:", fullPrice, "руб.");

// откат посреднику
let rollback = 30; // 30%
let servicePercentPrice = Math.ceil(fullPrice - (fullPrice * rollback) / 100);
console.log("Стоимость без отката посреднику:", servicePercentPrice, "руб.");

// скидки
if (fullPrice > 30000) {
  console.log("Даём скидку в 10%");
} else if (fullPrice > 15000 && fullPrice <= 30000) {
  console.log("Даём скидку в 5%");
} else if (fullPrice > 0 && fullPrice <= 15000) {
  console.log("Скидка не предусмотрена");
} else {
  console.log("Что-то пошло не так");
}

"use strict";

const appData = {
  title: "",
  screens: "",
  screenPrice: 0,
  adaptive: false,
  rollback: 10, // 10%
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  service1: "",
  service2: "",

  // 1) Вся логика теперь внутри объекта — это методы

  // метод, который запрашивает у пользователя число
  getValidNumber(message) {
    let value;

    do {
      value = prompt(message);
      if (value === null) return null; // если пользователь нажал "Отмена"

      value = value.trim();
    } while (value === "" || isNaN(value));

    return Number(value);
  },

  // задаём основные вопросы
  asking() {
    this.title = prompt("Как называется ваш проект?", "Калькулятор верстки");
    this.screens = prompt(
      "Какие типы экранов нужно разработать? (например: Простые, Сложные, Интерактивные)"
    );

    this.screenPrice = this.getValidNumber(
      "Сколько будет стоить данная работа?"
    );

    if (this.screenPrice === null) {
      alert("Ввод отменён пользователем.");
      return;
    }

    this.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // запрашиваем доп. услуги и их стоимость
  getAllServicePrices() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
      let service = prompt("Какой дополнительный тип услуги нужен?");
      let price = this.getValidNumber("Сколько это будет стоить?");

      if (price === null) {
        alert("Ввод отменён пользователем.");
        return;
      }

      sum += price;

      if (i === 0) {
        this.service1 = service;
      } else {
        this.service2 = service;
      }
    }

    return sum;
  },

  showTypeOf(variable) {
    console.log(variable, typeof variable);
  },

  getFullPrice() {
    return this.screenPrice + this.allServicePrices;
  },

  getServicePercentPrices() {
    return this.fullPrice - this.fullPrice * (this.rollback / 100);
  },

  getTitle() {
    const trimmed = this.title.trim();
    return trimmed[0].toUpperCase() + trimmed.slice(1).toLowerCase();
  },

  getRollbackMessage(price) {
    if (price >= 30000) {
      return "Даём скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даём скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },

  // 3) logger — выводит всё содержимое объекта
  logger() {
    console.log("------ LOGGER appData ------");
    for (let key in this) {
      console.log(`${key}:`, this[key]);
    }
    console.log("------ END LOGGER ------");
  },

  // 2) start — запускаем ВСЮ логику в нужном порядке
  start() {
    this.asking();
    this.allServicePrices = this.getAllServicePrices();
    this.fullPrice = this.getFullPrice();
    this.servicePercentPrice = this.getServicePercentPrices();
    this.title = this.getTitle();

    this.showTypeOf(this.title);
    this.showTypeOf(this.screenPrice);
    this.showTypeOf(this.adaptive);

    console.log("allServicePrices", this.allServicePrices);

    console.log(this.getRollbackMessage(this.fullPrice));
    console.log(typeof this.title);
    console.log(typeof this.screenPrice);
    console.log(typeof this.adaptive);

    console.log(this.screens.length);
    console.log(this.servicePercentPrice);

    console.log(
      "Стоимость верстки экранов " + this.screenPrice + " рубли",
      "стоимость разработки сайта " + this.fullPrice + " рубли"
    );

    // 3) в конце — логгер
    this.logger();
  },
};

// 4) ВНЕ объекта — только один вызов:
appData.start();

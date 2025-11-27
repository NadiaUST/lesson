"use strict";

const appData = {
  title: "",
  screens: [],
  screenPrice: 0,
  adaptive: true,
  rollback: 10,
  allServicePrices: 0,
  fullPrice: 0,
  servicePercentPrice: 0,
  services: {},

  start: function () {
    appData.asking();
    appData.addPrices();
    appData.getFullPrice();
    appData.getServicePercentPrice();
    appData.getTitle();

    appData.logger();
  },

  // проверка на число
  isNumber: function (num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
  },

  // проверка текста (НЕ пусто и НЕ только цифры)
  isValidText: function (str) {
    if (!str) return false;
    str = str.trim();
    return str !== "" && !/^\d+$/.test(str);
  },

  asking: function () {
    // НАЗВАНИЕ ПРОЕКТА — СТРОКА
    do {
      appData.title = prompt(
        "Как называется ваш проект?",
        "Калькулятор верстки"
      );
    } while (!appData.isValidText(appData.title));

    // ЭКРАНЫ (2 раза)
    for (let i = 0; i < 2; i++) {
      let name;

      // строка
      do {
        name = prompt("Какие типы экранов нужно разработать?");
      } while (!appData.isValidText(name));

      let price;
      // число
      do {
        price = prompt("Сколько будет стоить данная работа?");
      } while (!appData.isNumber(price));

      appData.screens.push({ id: i, name: name, price: +price });
    }

    // ДОП. УСЛУГИ (2 раза)
    for (let i = 0; i < 2; i++) {
      let name;

      // строка
      do {
        name = prompt("Какой дополнительный тип услуги нужен?");
      } while (!appData.isValidText(name));

      let price;
      // число
      do {
        price = prompt("Сколько это будет стоить?");
      } while (!appData.isNumber(price));

      // уникальность ключей:
      let originalName = name;
      let counter = 1;
      while (appData.services.hasOwnProperty(name)) {
        name = originalName + "_" + counter;
        counter++;
      }

      appData.services[name] = +price;
    }

    appData.adaptive = confirm("Нужен ли адаптив на сайте?");
  },

  // считаем цены через reduce
  addPrices: function () {
    // сумма экранов
    appData.screenPrice = appData.screens.reduce((sum, screen) => {
      return sum + Number(screen.price);
    }, 0);

    // сумма доп. услуг
    appData.allServicePrices = Object.values(appData.services).reduce(
      (sum, price) => {
        return sum + price;
      },
      0
    );
  },

  getFullPrice: function () {
    appData.fullPrice = appData.screenPrice + appData.allServicePrices;
  },

  getServicePercentPrice: function () {
    appData.servicePercentPrice =
      appData.fullPrice - (appData.fullPrice * appData.rollback) / 100;
  },

  getTitle: function () {
    appData.title =
      appData.title.trim().charAt(0).toUpperCase() +
      appData.title.trim().substr(1).toLowerCase();
  },

  getRollbackMessage: function (price) {
    if (price >= 30000) {
      return "Даем скидку в 10%";
    } else if (price >= 15000 && price < 30000) {
      return "Даем скидку в 5%";
    } else if (price >= 0 && price < 15000) {
      return "Скидка не предусмотрена";
    } else {
      return "Что-то пошло не так";
    }
  },

  logger: function () {
    console.log("Название:", appData.title);
    console.log("Экраны:", appData.screens);
    console.log("Услуги:", appData.services);
    console.log("Полная цена:", appData.fullPrice);
    console.log("Цена со скидкой:", appData.servicePercentPrice);
    console.log(appData.getRollbackMessage(appData.fullPrice));
  },
};

appData.start();

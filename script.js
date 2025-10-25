let title = "Project";
let screens = "Простые, Сложные, Интерактивные";
let screenPrice = 23;
let rollback = 58;
let fullPrice = 200;
let adaptive = true;

console.log(typeof title, fullPrice, adaptive); // вывод в консоль тип данных
console.log(screens.length); // вывод длинны строки
console.log(screenPrice, fullPrice); //  вывод в консоль
console.log(fullPrice * (rollback / 100)); // вывод % отката посреднику за работу

// приводим строку screens к нижнему регистру и разбиваем строку на массив
let lowerCaseScreens = screens.toLocaleLowerCase();
let charArray = lowerCaseScreens.split("");
console.log(charArray);

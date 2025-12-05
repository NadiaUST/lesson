// 1. Восстановить порядок книг
const books = document.querySelectorAll(".book");
const booksContainer = document.querySelector(".books");

// порядок книг: 1, 2, 3, 4, 5, 6
const booksOrder = [1, 0, 4, 3, 5, 2];
booksOrder.forEach((i) => booksContainer.append(books[i]));

// 2. Поменять фон
document.body.style.backgroundImage = 'url("./image/you-dont-know-js.jpg")';

// 3. Исправить заголовок в книге 3
const book3 = books[4]; // "Книга 3. this и Прототипы Объектов"
book3.querySelector("h2 a").textContent = "Книга 3. this и Прототипы Объектов";

// 4. Удалить рекламу
document.querySelector(".adv").remove();

// 5. Восстановить порядок глав во 2-й книге
const book2 = books[0];
const list2 = book2.querySelector("ul");
const chapters2 = list2.querySelectorAll("li");

// Правильный порядок:
const order2 = [
  0, // Введение
  1, // Предисловие
  3, // Глава 1
  6, // Глава 2
  8, // Глава 3
  4, // Глава 4
  5, // Глава 5
  7, // Приложение A
  9, // Приложение B
  2, // Приложение C
  10, // Приложение D
];

order2.forEach((i) => list2.append(chapters2[i]));

// 5. Восстановить порядок глав в 5-й книге
const book5 = books[5];
const list5 = book5.querySelector("ul");
const chapters5 = list5.querySelectorAll("li");

// Правильный порядок:
const order5 = [
  0, // Введение
  1, // Предисловие
  9, // Глава 1
  3, // Глава 2
  4, // Глава 3
  2, // Глава 4
  6, // Глава 5
  7, // Глава 6
  5, // Приложение A
  8, // Приложение B
  10, // Приложение C
];

order5.forEach((i) => list5.append(chapters5[i]));

// 6. В 6-й книге добавить главу 8
const book6 = books[2];
const list6 = book6.querySelector("ul");
const chapters6 = list6.querySelectorAll("li");

const newChapter = document.createElement("li");
newChapter.textContent = "Глава 8: За пределами ES6";

// вставляем перед последним элементом (Приложение A: Благодарности!)
list6.insertBefore(newChapter, chapters6[chapters6.length - 1]);

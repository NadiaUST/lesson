function guessGame() {
  // ЗАГАДАННОЕ ЧИСЛО в ЗАМЫКАНИИ
  const secretNumber = Math.floor(Math.random() * 100) + 1;

  // РЕКУРСИВНАЯ функция
  function ask() {
    const userInput = prompt("Угадай число от 1 до 100");

    // Если нажали "Отмена"
    if (userInput === null) {
      alert("Игра окончена");
      return;
    }

    const number = Number(userInput);

    // Если ввели НЕ число
    if (Number.isNaN(number)) {
      alert("Введи число!");
      return ask(); // рекурсия
    }

    // Если больше
    if (number > secretNumber) {
      alert("Загаданное число меньше");
      return ask();
    }

    // Если меньше
    if (number < secretNumber) {
      alert("Загаданное число больше");
      return ask();
    }

    // Если угадал
    alert("Поздравляю, Вы угадали!!!");
  }

  // Запускаем игру
  ask();
}

// Старт
guessGame();

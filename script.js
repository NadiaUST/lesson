function guessGame() {
  // ЗАГАДАННОЕ ЧИСЛО в ЗАМЫКАНИИ
  const secretNumber = Math.floor(Math.random() * 100) + 1;
  let attemptsLeft = 10; // количество попыток

  // РЕКУРСИВНАЯ функция
  function ask() {
    const userInput = prompt(
      `Угадай число от 1 до 100. Осталось попыток: ${attemptsLeft}`
    );

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

    // Угадал
    if (number === secretNumber) {
      const playAgain = confirm(
        "Поздравляю, Вы угадали!!! Хотели бы сыграть еще?"
      );
      if (playAgain) {
        guessGame(); // новая игра: новое число и снова 10 попыток
      } else {
        alert("Спасибо за игру, до встречи!");
      }
      return;
    }

    // Число неверное — тратим попытку
    attemptsLeft--;

    // Если попытки закончились
    if (attemptsLeft === 0) {
      const playAgain = confirm("Попытки закончились, хотите сыграть еще?");
      if (playAgain) {
        guessGame();
      } else {
        alert("Спасибо за игру, до встречи!");
      }
      return;
    }

    // Подсказка: больше или меньше + сколько осталось
    if (number > secretNumber) {
      alert(`Загаданное число меньше, осталось попыток ${attemptsLeft}`);
    } else {
      alert(`Загаданное число больше, осталось попыток ${attemptsLeft}`);
    }

    // Рекурсивный вызов
    ask();
  }

  // Запускаем игру
  ask();
}

// Старт
guessGame();

/* Проверяем длину строки */

function lineLenght(text, count) {
  return text.length <= count;
}
lineLenght('проверяемая строка', 20);
lineLenght('проверяемая строка', 18);
lineLenght('проверяемая строка', 10);

/* Проверка, является ли строка палиндромом */

function isPalindrome(text) {
  const normalized = text.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }
  return normalized === reversed;
}
isPalindrome('топот');
isPalindrome('ДовОд');
isPalindrome('Кекс');
isPalindrome('Лёша на полке клопа нашёл ');

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа */

function extractNumbers(text) {
  const str = String(text);

  let result = '';

  for (let i = 0; i < str.length; i++) {
    const number = parseInt(str[i], 10);

    if (!Number.isNaN(number)) {
      result += str[i];
    }
  }
  if (result === '') {
    return NaN;
  }
  return parseInt(result, 10);
}

extractNumbers('2023 год');
extractNumbers('ECMAScript 2022');
extractNumbers('1 кефир, 0.5 батона');
extractNumbers('агент 007');
extractNumbers('a я томат');

extractNumbers(2023);
extractNumbers(-1);
extractNumbers(1.5);

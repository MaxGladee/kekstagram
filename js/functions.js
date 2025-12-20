/* Проверяем длину строки */

// eslint-disable-next-line no-unused-vars
function lineLenght(text, count) {
  return text.length <= count;
}

/* Проверка, является ли строка палиндромом */

// eslint-disable-next-line no-unused-vars
function isPalindrome(text) {
  const normalized = text.replaceAll(' ', '').toLowerCase();
  let reversed = '';
  for (let i = normalized.length - 1; i >= 0; i--) {
    reversed += normalized[i];
  }
  return normalized === reversed;
}

/* Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа */

// eslint-disable-next-line no-unused-vars
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

/* Функция, принимающая время начала и конца рабочего дня, продолжительности встречи в рамках рабочего дня */

// eslint-disable-next-line no-unused-vars
function isMeetingWithinWorkday(workStart, workEnd, meetingStart, meetingDuration) {
  const toMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStartMinutes = toMinutes(workStart);
  const workEndMinutes = toMinutes(workEnd);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return (
    meetingStartMinutes >= workStartMinutes &&
    meetingEndMinutes <= workEndMinutes
  );
}

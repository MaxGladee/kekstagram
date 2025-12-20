/** Функция для генерации случайного числа в заданном диапазоне

  @param {number} min
  @param {number} max
  @returns {number}

*/

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Генератор уникальных id  */

export function createCommentIdGenerator() {
  let currentId = 1;
  return function () {
    return currentId++;
  };
}

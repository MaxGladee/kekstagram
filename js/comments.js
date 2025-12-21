import { getRandomInt, createCommentIdGenerator } from './utils.js';
import { SENTENCES, NAMES } from './data.js';

const generateCommentId = createCommentIdGenerator();

/** Рандомный путь к аватарке */

export function randAvatar() {
  return `img/avatar-${getRandomInt(1, 6)}.svg`;
}

/** Генерация текста комментария */

export function randMessage() {
  const take = getRandomInt(1, 2);
  const pool = SENTENCES.slice();
  const parts = [];

  for (let i = 0; i < take && pool.length > 0; i++) {
    const idx = getRandomInt(0, pool.length - 1);
    parts.push(pool[idx]);
    pool.splice(idx, 1);
  }

  return parts.join(' ');
}

/** Создает один объект комментария */

export function makeComment() {
  return {
    id: generateCommentId(),
    avatar: randAvatar(),
    message: randMessage(),
    name: NAMES[getRandomInt(0, NAMES.length - 1)]
  };
}

/** Создает массив комментариев */

export function makeComments() {
  const count = getRandomInt(0, 30);
  const list = [];

  for (let i = 0; i < count; i++) {
    list.push(makeComment());
  }

  return list;
}

import { DESCRIPTIONS } from './data.js';
import { makeComments } from './comments.js';
import { getRandomInt } from './utils.js';

/** Создаёт объект фотографии */

export function makePhoto(i) {
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: DESCRIPTIONS[(i - 1) % DESCRIPTIONS.length],
    likes: getRandomInt(15, 200),
    comments: makeComments()
  };
}

/** Создаёт набор фотографий */
export function createPhotos({ count = 25 } = {}) {
  const photos = [];
  for (let i = 1; i <= count; i++) {
    photos.push(makePhoto(i));
  }
  return photos;
}

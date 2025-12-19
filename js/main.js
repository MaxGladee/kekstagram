const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём', 'Мария', 'Ирина', 'Сергей', 'Ольга', 'Владимир', 'Екатерина', 'Никита', 'Ксения', 'Дмитрий'
];

const DESCRIPTIONS = [
  'Тёплая погода.',
  'Минималистичный вид.',
  'Прогулка в парке',
  'Завтрак на балконе',
  'Поездка на выходные',
  'Звезды ночью',
];

/* Функция для генерации случайного числа в заданном диапазоне */

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Функция для генерации уникальных id для комментариев */

function createCommentIdGenerator() {
  let currentId = 1;

  return function () {
    return currentId++;
  };
}
const generateCommentId = createCommentIdGenerator();

/* Функция для генерации пути к случайной аватарке */

function randAvatar() {
  return `img/avatar-${getRandomInt(1, 6)}.svg`;
}

/* Функция для генерации текста комментария из 1-2 случайных предложений */

function randMessage() {
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

/* Функция для генерации одного комментария */

function makeComment() {
  return {
    id: generateCommentId(),
    avatar: randAvatar(),
    message: randMessage(),
    name: NAMES[getRandomInt(0, NAMES.length - 1)]
  };
}

/* Функция для генерации массива комментариев */

function makeComments() {
  const count = getRandomInt(0, 30);
  const list = [];

  for (let i = 0; i < count; i++) {
    list.push(makeComment());
  }

  return list;
}

/* Функция для генерации массива фотографий */

function makePhoto(i) {
  return {
    id: i,
    url: `photos/${i}.jpg`,
    description: DESCRIPTIONS[(i - 1) % DESCRIPTIONS.length],
    likes: getRandomInt(15, 200),
    comments: makeComments()
  };
}

/* Создание массива из 25 фотографий */

const photos = [];

for (let i = 1; i <= 25; i++) {
  photos.push(makePhoto(i));
}

import { openBigPictureFromFilter } from './full-picture.js';

const RENDER_DEBOUNCE_DELAY = 500;
let debounceTimer = null;
let allPhotos = [];
let currentFilter = 'default';

const filterButtons = {
  default: document.querySelector('#filter-default'),
  random: document.querySelector('#filter-random'),
  discussed: document.querySelector('#filter-discussed'),
};

const filtersContainer = document.querySelector('.img-filters');

/* Функция для получения случайных фотографий */

function getRandomPhotos(photos, count = 10) {
  const shuffled = [...photos].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getDiscussedPhotos(photos) {
  return [...photos].sort((a, b) => b.comments.length - a.comments.length);
}

/* Функция для применения фильтра */

function applyFilter(filterName) {
  let filteredPhotos = [];

  switch (filterName) {
    case 'random':
      filteredPhotos = getRandomPhotos(allPhotos);
      break;
    case 'discussed':
      filteredPhotos = getDiscussedPhotos(allPhotos);
      break;
    case 'default':
    default:
      filteredPhotos = [...allPhotos];
      break;
  }

  return filteredPhotos;
}

/* Функция для перерисовки фотографий */

function rerenderPhotos(filteredPhotos) {
  const picturesContainer = document.querySelector('.pictures');

  const oldPictures = picturesContainer.querySelectorAll('.picture');
  oldPictures.forEach((picture) => picture.remove());

  /* Создает и добавляет новые фотографии */

  const fragment = document.createDocumentFragment();

  filteredPhotos.forEach((photo) => {
    const template = document.querySelector('#picture');
    const pictureElement = template.cloneNode(true).content;

    const img = pictureElement.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;

    const likesBlock = pictureElement.querySelector('.picture__likes');
    likesBlock.textContent = photo.likes;

    const commentsBlock = pictureElement.querySelector('.picture__comments');
    commentsBlock.textContent = photo.comments.length;

    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);

  attachPhotoClickHandlers(filteredPhotos);
}

/* Функция для debounce */

function debounceRender(filteredPhotos) {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    rerenderPhotos(filteredPhotos);
  }, RENDER_DEBOUNCE_DELAY);
}

/* Функция для обновления активной кнопки фильтра */

function updateActiveButton(filterName) {
  Object.keys(filterButtons).forEach((key) => {
    filterButtons[key].classList.remove('img-filters__button--active');
  });

  filterButtons[filterName].classList.add('img-filters__button--active');
}

/* Функция для присоединения обработчиков кликов на фотографии */

function attachPhotoClickHandlers(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const pictures = picturesContainer.querySelectorAll('.picture');

  pictures.forEach((picture, index) => {
    picture.addEventListener('click', () => {
      openBigPictureFromFilter(photos[index], index);
    });
  });
}

/* Функция для инициализации фильтров */

export function initFilters(photos) {
  try {
    allPhotos = photos;

    filtersContainer.classList.remove('img-filters--inactive');

    // Добавляем обработчики на кнопки фильтров
    filterButtons.default.addEventListener('click', () => {
      currentFilter = 'default';
      updateActiveButton('default');
      const filteredPhotos = applyFilter('default');
      debounceRender(filteredPhotos);
    });

    filterButtons.random.addEventListener('click', () => {
      currentFilter = 'random';
      updateActiveButton('random');
      const filteredPhotos = applyFilter('random');
      debounceRender(filteredPhotos);
    });

    filterButtons.discussed.addEventListener('click', () => {
      currentFilter = 'discussed';
      updateActiveButton('discussed');
      const filteredPhotos = applyFilter('discussed');
      debounceRender(filteredPhotos);
    });

    updateActiveButton('default');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Ошибка при инициализации фильтров:', error);
  }
}
export function getCurrentFilteredPhotos() {
  return applyFilter(currentFilter);
}

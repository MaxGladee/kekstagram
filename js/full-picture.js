import { photos } from './main.js';

/* Функция просмотра фотографий в полноразмерном режиме */

function createCommentElement(comment) {
  const li = document.createElement('li');
  li.className = 'social__comment';

  li.innerHTML = `
    <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35"
        height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return li;
}

/* Заполняет полноразмерное окно данными о фотографии */

function fillBigPicture(photo) {
  const bigPictureImg = document.querySelector('.big-picture__img img');
  const likesCount = document.querySelector('.likes-count');
  const commentsCount = document.querySelector('.comments-count');
  const socialCaption = document.querySelector('.social__caption');
  const socialComments = document.querySelector('.social__comments');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  likesCount.textContent = photo.likes;

  commentsCount.textContent = photo.comments.length;

  socialCaption.textContent = photo.description;

  socialComments.innerHTML = '';

  const commentFragment = document.createDocumentFragment();
  photo.comments.forEach((comment) => {
    commentFragment.appendChild(createCommentElement(comment));
  });
  socialComments.appendChild(commentFragment);
}

/* Открывает окно полноразмерного просмотра */

function openBigPicture(photo) {
  const bigPicture = document.querySelector('.big-picture');

  fillBigPicture(photo);

  bigPicture.classList.remove('hidden');

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  document.body.classList.add('modal-open');
}

/* Закрывает окно полноразмерного просмотра */

function closeBigPicture() {
  const bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');
}

/* Инициализирует модуль полноразмерного просмотра */

export function initBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  const closeButton = bigPicture.querySelector('.big-picture__cancel');

  closeButton.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
      closeBigPicture();
    }
  });
}

/* Добавляет слушатели клика к миниатюрам */

export function attachPhotoClickHandlers() {
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');

    if (picture) {
      const pictures = document.querySelectorAll('.picture');
      const index = Array.from(pictures).indexOf(picture);

      if (index !== -1) {
        openBigPicture(photos[index]);
      }
    }
  });
}

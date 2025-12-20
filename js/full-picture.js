import { photos } from './main.js';

/* Функция просмотра фотографий в полноразмерном режиме */

const COMMENTS_PER_PAGE = 5;
let currentPhotoIndex = null;
let currentDisplayedComments = 0;

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

/* Обновляет счетчик комментариев и управляет видимостью кнопки загрузки */

function updateCommentCount() {
  const commentCount = document.querySelector('.social__comment-count');
  const commentLoader = document.querySelector('.comments-loader');
  const photo = photos[currentPhotoIndex];
  const totalComments = photo.comments.length;

  const displayedCount = Math.min(currentDisplayedComments, totalComments);
  commentCount.textContent = `${displayedCount} из ${totalComments}`;

  if (currentDisplayedComments >= totalComments) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
}


/* Отрисовывает комментарии по 5 штук */

function renderComments(photo, startIndex = 0) {
  const socialComments = document.querySelector('.social__comments');

  const endIndex = startIndex + COMMENTS_PER_PAGE;
  const commentsToShow = photo.comments.slice(startIndex, endIndex);

  const commentFragment = document.createDocumentFragment();
  commentsToShow.forEach((comment) => {
    commentFragment.appendChild(createCommentElement(comment));
  });

  socialComments.appendChild(commentFragment);

  currentDisplayedComments = endIndex;
  updateCommentCount();
}

/* Заполняет полноразмерное окно данными о фотографии */

function fillBigPicture(photo) {
  const bigPictureImg = document.querySelector('.big-picture__img img');
  const likesCount = document.querySelector('.likes-count');
  const socialCaption = document.querySelector('.social__caption');
  const socialComments = document.querySelector('.social__comments');

  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;

  likesCount.textContent = photo.likes;

  socialCaption.textContent = photo.description;

  socialComments.innerHTML = '';

  currentDisplayedComments = 0;
  renderComments(photo, 0);
}

/* Открывает окно полноразмерного просмотра */

function openBigPicture(photo, photoIndex) {
  const bigPicture = document.querySelector('.big-picture');

  currentPhotoIndex = photoIndex;

  fillBigPicture(photo);

  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');
}

/* Закрывает окно полноразмерного просмотра */

function closeBigPicture() {
  const bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  currentPhotoIndex = null;
  currentDisplayedComments = 0;
}

/* Инициализирует модуль полноразмерного просмотра */

export function initBigPicture() {
  const bigPicture = document.querySelector('.big-picture');
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  const commentsLoader = document.querySelector('.comments-loader');

  closeButton.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !bigPicture.classList.contains('hidden')) {
      closeBigPicture();
    }
  });

  commentsLoader.addEventListener('click', () => {
    if (currentPhotoIndex !== null) {
      const photo = photos[currentPhotoIndex];
      renderComments(photo, currentDisplayedComments);
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
        openBigPicture(photos[index], index);
      }
    }
  });
}

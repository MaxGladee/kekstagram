const COMMENTS_PER_PAGE = 5;
// eslint-disable-next-line no-unused-vars
let currentPhotoIndex = null;
let currentDisplayedComments = 0;
let currentPhotos = [];
let currentPhoto = null;

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

function updateCommentCount() {
  const commentCountContainer = document.querySelector('.social__comment-count');
  const commentLoader = document.querySelector('.comments-loader');

  const totalComments = currentPhoto.comments.length;
  const displayedCount = Math.min(currentDisplayedComments, totalComments);

  commentCountContainer.innerHTML = `<span class="social__comment-shown-count">${displayedCount}</span> из <span class="social__comment-total-count">${totalComments}</span> комментариев`;

  if (currentDisplayedComments >= totalComments) {
    commentLoader.classList.add('hidden');
  } else {
    commentLoader.classList.remove('hidden');
  }
}


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

function openBigPicture(photo, photoIndex) {
  const bigPicture = document.querySelector('.big-picture');

  currentPhoto = photo;
  currentPhotoIndex = photoIndex;

  fillBigPicture(photo);

  bigPicture.classList.remove('hidden');

  document.body.classList.add('modal-open');
}

function closeBigPicture() {
  const bigPicture = document.querySelector('.big-picture');

  bigPicture.classList.add('hidden');

  document.body.classList.remove('modal-open');

  currentPhotoIndex = null;
  currentDisplayedComments = 0;
  currentPhoto = null;
}

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
    if (currentPhoto) {
      renderComments(currentPhoto, currentDisplayedComments);
    }
  });
}

export function attachPhotoClickHandlers() {
  const picturesContainer = document.querySelector('.pictures');
  const pictures = picturesContainer.querySelectorAll('.picture');

  pictures.forEach((picture, index) => {
    picture.addEventListener('click', () => {
      if (index !== -1 && currentPhotos.length > 0) {
        openBigPicture(currentPhotos[index], index);
      }
    });
  });
}

/* Функция для открытия фото из фильтров */

export function openBigPictureFromFilter(photo, photoIndex) {
  openBigPicture(photo, photoIndex);
}

export function setCurrentPhotos(photos) {
  currentPhotos = photos;
}

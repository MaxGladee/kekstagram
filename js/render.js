import { photos } from './main.js';

/** Создает DOM-элемент фотографии на основе шаблона
 * @param {Object} photo
 * @returns {HTMLElement}
 */
function createPhotoElement(photo) {
  const template = document.querySelector('#picture');
  const pictureElement = template.cloneNode(true).content;

  const img = pictureElement.querySelector('.picture__img');
  img.src = photo.url;
  img.alt = photo.description;

  const likesBlock = pictureElement.querySelector('.picture__likes');
  likesBlock.textContent = photo.likes;

  const commentsBlock = pictureElement.querySelector('.picture__comments');
  commentsBlock.textContent = photo.comments.length;

  return pictureElement;
}

/* Отрисовывает все фотографии в контейнер */

export function renderPictures() {
  const picturesContainer = document.querySelector('.pictures');

  const fragment = document.createDocumentFragment();

  /* Заполняет фрагмент элементами фотографий */

  photos.forEach((photo) => {
    fragment.appendChild(createPhotoElement(photo));
  });

  picturesContainer.appendChild(fragment);
}

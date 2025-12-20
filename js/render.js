import { getPhotos } from './api.js';

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

export async function renderPictures() {
  const picturesContainer = document.querySelector('.pictures');

  try {
    const photos = await getPhotos();

    const fragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      fragment.appendChild(createPhotoElement(photo));
    });

    picturesContainer.appendChild(fragment);
  } catch (error) {
    const errorElement = document.createElement('div');
    errorElement.style.cssText = 'padding: 20px; color: red; text-align: center;';
    errorElement.textContent = 'Ошибка при загрузке фотографий. Попробуйте позже.';
    picturesContainer.appendChild(errorElement);
  }
}

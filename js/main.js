import { createPhotos } from './photos.js';
import { renderPictures } from './render.js';
import { initBigPicture, attachPhotoClickHandlers } from './full-picture.js';
import { initForm } from './form.js';

const PHOTOS = createPhotos({ count: 25 });
export { PHOTOS as photos };

document.addEventListener('DOMContentLoaded', () => {
  renderPictures();
  initBigPicture();
  attachPhotoClickHandlers();
  initForm();
});

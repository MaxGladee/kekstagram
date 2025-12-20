import { renderPictures } from './render.js';
import { initBigPicture, attachPhotoClickHandlers } from './full-picture.js';
import { initForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
  renderPictures();
  initBigPicture();
  attachPhotoClickHandlers();
  initForm();
});

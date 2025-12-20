import { createPhotos } from './photos.js';
import { renderPictures } from './render.js';

const PHOTOS = createPhotos({ count: 25 });
export { PHOTOS as photos };

document.addEventListener('DOMContentLoaded', renderPictures);

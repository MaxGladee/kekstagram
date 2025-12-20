/* Модуль для работы с формой загрузки изображения */

import { initImageEditor, resetImageEditor } from './image-editor.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

let pristine;

/* Инициализирует Pristine для валидации формы */

function initPristine() {
  if (typeof Pristine === 'undefined') {
    return;
  }

  pristine = new Pristine(imgUploadForm, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field-wrapper--error',
    successClass: 'img-upload__field-wrapper--success',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'img-upload__field-wrapper__error'
  });

  pristine.addValidator(hashtagsInput, (value) => {
    if (!value.trim()) {
      return true;
    }

    const hashtags = value.trim().split(/\s+/);

    if (hashtags.length > MAX_HASHTAGS) {
      return false;
    }

    return hashtags.every((tag) => HASHTAG_REGEX.test(tag) && tag.length <= 20);
  }, 'Максимум 5 хеш-тегов. Каждый тег начинается с #, содержит буквы и цифры, макс 20 символов');

  pristine.addValidator(commentInput, (value) => value.length <= MAX_COMMENT_LENGTH, `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`);
}

/* Открывает окно редактирования изображения */

function openImgUploadOverlay() {
  imgUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onOverlayEscKeyDown);
  initImageEditor();
}

/* Закрывает окно редактирования изображения */

function closeImgUploadOverlay() {
  imgUploadOverlay.classList.add('hidden');
  imgUploadForm.reset();
  imgUploadInput.value = '';
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onOverlayEscKeyDown);
  resetImageEditor();
}

/* Обработчик нажатия Esc при открытом окне */

function onOverlayEscKeyDown(evt) {
  if (evt.key === 'Escape') {
    closeImgUploadOverlay();
  }
}

/* Обработчик нажатия Esc в поле ввода - отменяет закрытие окна */

function onInputKeyDown(evt) {
  evt.stopPropagation();
}

/* Инициализирует модуль формы */

export function initForm() {
  setTimeout(() => {
    initPristine();
  }, 100);

  imgUploadInput.addEventListener('change', openImgUploadOverlay);

  imgUploadCancel.addEventListener('click', closeImgUploadOverlay);

  hashtagsInput.addEventListener('keydown', onInputKeyDown);
  commentInput.addEventListener('keydown', onInputKeyDown);

  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    if (pristine && pristine.validate()) {
      imgUploadForm.submit();
    }
  });
}

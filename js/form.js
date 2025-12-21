/* Модуль для работы с формой загрузки изображения */

import { initImageEditor, resetImageEditor } from './image-editor.js';
import { sendForm } from './api.js';
import { showSuccessMessage, showErrorMessage } from './message.js';

const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
const MAX_HASHTAGS = 5;
const MAX_COMMENT_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');
const imgPreview = document.querySelector('.img-upload__preview img');

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
    return hashtags.length <= MAX_HASHTAGS;
  }, `Максимум ${MAX_HASHTAGS} хеш-тегов`);

  pristine.addValidator(hashtagsInput, (value) => {
    if (!value.trim()) {
      return true;
    }

    const hashtags = value.trim().split(/\s+/);
    return hashtags.every((tag) => tag !== '#' && HASHTAG_REGEX.test(tag) && tag.length <= 20);
  }, 'Неверный формат хеш-тега (начинается с #, только буквы и цифры, до 20 символов)');

  pristine.addValidator(hashtagsInput, (value) => {
    if (!value.trim()) {
      return true;
    }

    const hashtags = value.trim().split(/\s+/);
    const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
    return new Set(lowerCaseTags).size === lowerCaseTags.length;
  }, 'Обнаружены повторяющиеся хеш-теги');

  pristine.addValidator(commentInput, (value) => value.length <= MAX_COMMENT_LENGTH, `Комментарий не может быть длиннее ${MAX_COMMENT_LENGTH} символов`);
}

/* Загружает выбранное пользователем изображение в предпросмотр */
function loadSelectedImage() {
  const file = imgUploadInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (evt) => {
      imgPreview.src = evt.target.result;
    };

    reader.readAsDataURL(file);
  }
}

/* Открывает окно редактирования изображения */
function openImgUploadOverlay() {
  loadSelectedImage();
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

  if (pristine) {
    pristine.reset();
  }
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

/* Блокирует кнопку отправки */
function disableSubmitButton() {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляется...';
}

/* Разблокирует кнопку отправки */
function enableSubmitButton() {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
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

  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!pristine || !pristine.validate()) {
      return;
    }

    disableSubmitButton();

    try {
      await sendForm(imgUploadForm);
      showSuccessMessage();
      closeImgUploadOverlay();
    } catch (error) {
      showErrorMessage();
    } finally {
      enableSubmitButton();
    }
  });
}

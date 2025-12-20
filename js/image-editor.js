/* Модуль для редактирования изображения */

const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const EFFECTS = {
  none: {
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: (value) => `grayscale(${value})`
  },
  sepia: {
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    filter: (value) => `sepia(${value})`
  },
  marvin: {
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    filter: (value) => `invert(${value}%)`
  },
  phobos: {
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    filter: (value) => `blur(${value}px)`
  },
  heat: {
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    filter: (value) => `brightness(${value})`
  }
};

const scaleValue = document.querySelector('.scale__control--value');
const scaleMinus = document.querySelector('.scale__control--smaller');
const scalePlus = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview img');
const effectRadios = document.querySelectorAll('.effects__radio');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

let slider = null;
let currentEffect = 'none';

/* Обновляет масштаб изображения */

function updateScale(scale) {
  scaleValue.value = `${scale}%`;
  imgPreview.style.transform = `scale(${scale / 100})`;
}

/* Инициализирует noUiSlider для эффектов */

function initEffectSlider() {
  if (slider) {
    slider.destroy();
  }

  const effectConfig = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    effectLevelContainer.classList.add('hidden');
    imgPreview.style.filter = '';
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  slider = noUiSlider.create(effectLevelSlider, {
    start: effectConfig.max,
    connect: 'lower',
    range: {
      min: effectConfig.min,
      max: effectConfig.max
    },
    step: effectConfig.step,
    format: {
      to: (value) => Math.round(value * 100) / 100,
      from: (value) => Number(value)
    }
  });

  slider.on('update', (values) => {
    const value = values[0];
    effectLevelValue.value = value;
    applyEffect(currentEffect, value);
  });
}

/* Применяет эффект к изображению */

function applyEffect(effect, value) {
  if (effect === 'none') {
    imgPreview.style.filter = '';
    return;
  }

  const effectConfig = EFFECTS[effect];
  const filterString = effectConfig.filter(value);
  imgPreview.style.filter = filterString;
}

/* Обработчик изменения эффекта */

function onEffectChange(evt) {
  currentEffect = evt.target.value;
  initEffectSlider();
}

/* Инициализирует модуль редактирования изображения */

export function initImageEditor() {
  updateScale(100);

  scaleMinus.addEventListener('click', () => {
    const currentScale = parseInt(scaleValue.value, 10);
    if (currentScale > SCALE_MIN) {
      updateScale(currentScale - SCALE_STEP);
    }
  });

  scalePlus.addEventListener('click', () => {
    const currentScale = parseInt(scaleValue.value, 10);
    if (currentScale < SCALE_MAX) {
      updateScale(currentScale + SCALE_STEP);
    }
  });

  effectRadios.forEach((radio) => {
    radio.removeEventListener('change', onEffectChange);
    radio.addEventListener('change', onEffectChange);
  });

  initEffectSlider();
}

/* Сбрасывает редактор при закрытии окна */

export function resetImageEditor() {
  updateScale(100);
  currentEffect = 'none';
  document.querySelector('#effect-none').checked = true;
  if (slider) {
    slider.destroy();
    slider = null;
  }
  imgPreview.style.filter = '';
  effectLevelContainer.classList.add('hidden');
}

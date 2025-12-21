/* Модуль для показа сообщений */

function closeMessage(messageElement, handlers) {
  messageElement.remove();

  if (handlers) {
    document.removeEventListener('keydown', handlers.keydown);
    document.removeEventListener('click', handlers.click);
  }
}

function onMessageEscKeyDown(evt, messageElement, handlers) {
  if (evt.key === 'Escape') {
    closeMessage(messageElement, handlers);
  }
}

function onMessageClick(evt, messageElement, handlers) {
  if (evt.target === messageElement) {
    closeMessage(messageElement, handlers);
  }
}

export function showSuccessMessage() {
  const template = document.querySelector('#success');
  const messageElement = template.cloneNode(true).content.querySelector('.success');

  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector('.success__button');

  // Создаём handlers для сохранения ссылок
  const handlers = {
    keydown: (evt) => onMessageEscKeyDown(evt, messageElement, handlers),
    click: (evt) => onMessageClick(evt, messageElement, handlers)
  };

  closeButton.addEventListener('click', () => {
    closeMessage(messageElement, handlers);
  });

  document.addEventListener('keydown', handlers.keydown);
  document.addEventListener('click', handlers.click);
}

export function showErrorMessage() {
  const template = document.querySelector('#error');
  const messageElement = template.cloneNode(true).content.querySelector('.error');

  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector('.error__button');

  // Создаём handlers для сохранения ссылок
  const handlers = {
    keydown: (evt) => onMessageEscKeyDown(evt, messageElement, handlers),
    click: (evt) => onMessageClick(evt, messageElement, handlers)
  };

  closeButton.addEventListener('click', () => {
    closeMessage(messageElement, handlers);
  });

  document.addEventListener('keydown', handlers.keydown);
  document.addEventListener('click', handlers.click);
}

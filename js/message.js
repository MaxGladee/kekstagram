/* Модуль для показа сообщений */

function closeMessage(messageElement) {
  messageElement.remove();
}

function onMessageEscKeyDown(evt, messageElement) {
  if (evt.key === 'Escape') {
    closeMessage(messageElement);
  }
}

function onMessageClick(evt, messageElement) {
  if (evt.target === messageElement) {
    closeMessage(messageElement);
  }
}

export function showSuccessMessage() {
  const template = document.querySelector('#success');
  const messageElement = template.cloneNode(true).content.querySelector('.success');

  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector('.success__button');

  closeButton.addEventListener('click', () => {
    closeMessage(messageElement);
  });

  document.addEventListener('keydown', (evt) => onMessageEscKeyDown(evt, messageElement));

  document.addEventListener('click', (evt) => onMessageClick(evt, messageElement));
}

export function showErrorMessage() {
  const template = document.querySelector('#error');
  const messageElement = template.cloneNode(true).content.querySelector('.error');

  document.body.appendChild(messageElement);

  const closeButton = messageElement.querySelector('.error__button');

  closeButton.addEventListener('click', () => {
    closeMessage(messageElement);
  });

  document.addEventListener('keydown', (evt) => onMessageEscKeyDown(evt, messageElement));

  document.addEventListener('click', (evt) => onMessageClick(evt, messageElement));
}

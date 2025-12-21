/* eslint-disable no-console */
/* Модуль для работы с сервером */

const BASE_URL = 'https://32.javascript.htmlacademy.pro/kekstagram';

/* Получает фотографии с сервера */

export async function getPhotos() {
  try {
    const response = await fetch(`${BASE_URL}/data`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки фотографий');
    }
    return await response.json();
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    throw error;
  }
}

/* Отправляет форму на сервер */

export async function sendForm(formElement) {
  try {
    const response = await fetch(`${BASE_URL}/`, {
      method: 'POST',
      body: new FormData(formElement)
    });

    if (!response.ok) {
      throw new Error('Ошибка отправки формы');
    }

    return await response.json();
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    throw error;
  }
}

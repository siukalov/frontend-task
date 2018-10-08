import { create } from 'load-js';

const API_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

const loadYandexMaps = () => {
  create([
    {
      async: true,
      url: API_URL,
    },
  ]);

  return window.ymaps;
};

export default loadYandexMaps;

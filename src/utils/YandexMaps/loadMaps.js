import loadJS from 'load-js';

const API_URL = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';

const loadYandexMaps = () => {
  const ymaps = loadJS([
    {
      async: true,
      url: API_URL,
    },
  ]).then(() => window.ymaps);

  return ymaps;
};

export default loadYandexMaps;

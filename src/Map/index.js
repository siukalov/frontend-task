import React from 'react';
import Ymaps from '../utils/YandexMaps/Ymaps';
import Map from './Map';

export default () => (
  <Ymaps>
    <Map
      settings={{
        center: [55.76, 37.64],
        zoom: 16,
        controls: ['zoomControl'],
        behaviors: ['drag'],
      }}
    />
  </Ymaps>
);

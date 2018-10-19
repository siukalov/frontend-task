import React from 'react';
import { mount } from 'enzyme';
import Placemark from '../Placemark';

import YmapsStub from '../../utils/ymapsStub';

describe('<Placemark />', () => {
  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };

  const ymaps = new YmapsStub();
  const map = new ymaps.Map('div', settings);

  let wrapper;
  let addPlacemark;
  let movePlacemark;

  describe('Behavior', () => {
    beforeEach(() => {
      const marker = {
        id: 0,
        name: 'Something else',
        coordinates: [52, 39],
        onMap: true,
      };

      addPlacemark = jest.fn();
      movePlacemark = jest.fn();

      const props = {
        ymaps,
        map,
        marker,
        addPlacemark,
        movePlacemark,
      };

      wrapper = mount(<Placemark {...props} />);
    });

    it('should call addPlacemark', () => {
      const { id } = wrapper.prop('marker');
      wrapper.instance().movePlacemarkCallback();
      expect(addPlacemark).toHaveBeenCalledWith(id);
    });

    it('should call movePlacemark', () => {
      const { id } = wrapper.prop('marker');
      const newCoordinates = [92, 39];
      wrapper.instance().movePlacemarkCallback(newCoordinates);
      expect(movePlacemark).toHaveBeenCalledWith(id, newCoordinates);
    });

    it('should not get an address for a placemark on ballon open in case there is no one', async () => {
      addPlacemark = jest.fn();
      movePlacemark = jest.fn();

      // ymapsStub treats empty coordinates as unknown address, everything else will be "Seasame street, 14"
      const marker = {
        id: 0,
        name: 'Something else',
        coordinates: [],
        onMap: true,
      };

      const props = {
        ymaps,
        map,
        marker,
        addPlacemark,
        movePlacemark,
      };

      wrapper = mount(<Placemark {...props} />);

      await wrapper.instance().balloonOpenCallback();
      expect(wrapper.state('placemark').properties.get('balloonContentBody')).toBe('Не удалось определить адрес.');
    });

    it('should get address for a placemark on ballon open', async () => {
      await wrapper.instance().balloonOpenCallback();
      expect(wrapper.state('placemark').properties.get('balloonContentBody')).toBe('Sesame street, 14');
    });
  });
});

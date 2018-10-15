import React from 'react';
import { mount } from 'enzyme';
import Route from '../Route';
import YmapsStub from '../../utils/ymapsStub';
import preloadedState from '../../utils/preloadedState';

describe('<Route />', () => {
  let wrapper;
  const ymaps = new YmapsStub();

  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };

  const instance = new ymaps.Map('div', settings);
  const addPlacemark = jest.fn();
  const updatePlacemark = jest.fn();

  const props = {
    ymaps,
    instance,
    markers: preloadedState.markers,
    addPlacemark,
    updatePlacemark,
  };

  describe('Render', () => {
    beforeAll(() => {
      wrapper = mount(<Route {...props} />);
    });

    it('should have Placemarks', () => {
      expect(wrapper.find('Placemark')).toHaveLength(props.markers.length);
    });
  });

  describe('Behavior', () => {
    beforeAll(() => {
      wrapper = mount(<Route {...props} />);
    });

    it('should not update Route if it has not been changed', () => {
      wrapper.setProps({ markers: props.markers });

      expect(wrapper.state('route').geometry.setCoordinates).not.toHaveBeenCalled();
    });

    it('should update Route if it has been changed', () => {
      const newMarker = {
        id: 3,
        name: 'Something else',
        coordinates: [52, 39],
        onMap: false,
      };
      const markers = [...props.markers, newMarker];
      wrapper.setProps({ markers });

      expect(wrapper.state('route').geometry.setCoordinates).toHaveBeenCalled();
    });
  });
});

import React from 'react';
import { mount } from 'enzyme';
import Placemark from '../Placemark';
import YmapsStub from '../../ymapsStub';

describe('Placemark', () => {
  const ymaps = new YmapsStub();
  const addPlacemark = jest.fn();
  const updatePlacemark = jest.fn();
  const mapDidUpdate = jest.fn();

  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };

  const instance = new ymaps.Map('div', settings);

  const props = {
    marker: {
      id: 0,
      name: 'Home',
      coordinates: [55, 38],
      onMap: false,
    },
    ymaps,
    instance,
    addPlacemark,
    updatePlacemark,
    mapDidUpdate,
  };

  it('should create Placemark', () => {
    const wrapper = mount(<Placemark {...props} />);
    expect(wrapper.state('placemark')).toBeTruthy();
  });

  it('should remove Placemark on unmounting', () => {
    const removeGeoObject = instance.geoObjects.remove;
    const wrapper = mount(<Placemark {...props} />);
    wrapper.instance().componentWillUnmount();

    expect(removeGeoObject).toHaveBeenCalled();
  });

  it('should call updatePlacemark on dragend', () => {
    const event = {
      get: jest.fn(() => ({ geometry: { getCoordinates: jest.fn() } })),
    };

    const wrapper = mount(<Placemark {...props} />);
    wrapper.state('placemark').dragend(event);

    expect(updatePlacemark).toHaveBeenCalled();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import Placemark from '../Placemark';
import YmapsStub from '../../ymapsStub';

describe('Placemark', () => {
  const ymaps = new YmapsStub();
  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };
  const map = new ymaps.Map('div', settings);

  let wrapper;

  beforeEach(() => {
    const addPlacemark = jest.fn();
    const updatePlacemark = jest.fn();
    const mapDidUpdate = jest.fn();

    const props = {
      marker: {
        id: 0,
        name: 'Home',
        coordinates: [55, 38],
        onMap: false,
      },
      ymaps,
      map,
      addPlacemark,
      updatePlacemark,
      mapDidUpdate,
    };

    wrapper = mount(<Placemark {...props} />);
  });

  it('should add Placemark on the Map', () => {
    expect(map.geoObjects.add).toHaveBeenCalled();
  });

  it('should remove Placemark on unmounting', () => {
    wrapper.instance().componentWillUnmount();
    expect(map.geoObjects.remove).toHaveBeenCalled();
  });

  it('should call updatePlacemark on dragend', () => {
    const event = {
      get: jest.fn(() => ({ geometry: { getCoordinates: jest.fn() } })),
    };

    wrapper.state('placemark').dragend(event);

    expect(wrapper.props().updatePlacemark).toHaveBeenCalled();
  });
});

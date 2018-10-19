import React from 'react';
import { mount } from 'enzyme';
import Placemark from '../Placemark';
import YmapsStub from '../../ymapsStub';

describe('Placemark', () => {
  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };

  const ymaps = new YmapsStub();
  const map = new ymaps.Map('div', settings);

  let wrapper;

  beforeEach(() => {
    const addPlacemarkCallback = jest.fn();
    const movePlacemarkCallback = jest.fn();
    const balloonOpenCallback = jest.fn();
    const savePlacemarkInstance = jest.fn();

    const styles = {
      draggable: true,
      hasBalloon: true,
      preset: 'islands#blueIcon',
    };

    const options = {
      balloonContent: 'Home',
    };

    const props = {
      ymaps,
      map,
      coordinates: [55, 38],
      options,
      styles,
      savePlacemarkInstance,
      addPlacemarkCallback,
      movePlacemarkCallback,
      balloonOpenCallback,
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

  it('should call movePlacemarkCallback on drag', () => {
    const coordinates = [32, 54];
    const event = {
      get: jest.fn(() => ({ geometry: { getCoordinates: jest.fn(() => coordinates) } })),
    };
    wrapper.instance().placemark.drag(event);

    expect(wrapper.props().movePlacemarkCallback).toHaveBeenCalledWith(coordinates);
  });

  it('should call balloonOpenCallback on balloonopen', () => {
    wrapper.instance().placemark.balloonopen();

    expect(wrapper.props().balloonOpenCallback).toHaveBeenCalled();
  });
});

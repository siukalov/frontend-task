import React from 'react';
import { mount } from 'enzyme';
import Placemark from '../Placemark';
import YmapsStub from '../../ymapsStub';

describe('Placemark', () => {
  const ymaps = new YmapsStub();
  const addPlacemark = jest.fn();
  const updatePlacemark = jest.fn();

  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag']
  };

  const mapInstance = new ymaps.Map('div', settings);

  const defualtProps = {
    marker: {
      id: 0,
      name: 'Home',
      coordinates: [55, 38],
      onMap: false
    },
    ymaps,
    mapInstance,
    addPlacemark,
    updatePlacemark
  };

  it('should create Placemark', () => {
    const wrapper = mount(<Placemark {...defualtProps} />);
    expect(wrapper.state('placemark')).toBeTruthy();
  });

  it('should remove Placemark on unmounting', () => {
    const removeGeoObject = mapInstance.geoObjects.remove;
    const wrapper = mount(<Placemark {...defualtProps} />);
    wrapper.instance().componentWillUnmount();

    expect(removeGeoObject).toHaveBeenCalled();
  });

  it('should call updatePlacemark on dragend', () => {
    const event = {
      get: jest.fn(() => ({ geometry: { getCoordinates: jest.fn() } }))
    };

    const wrapper = mount(<Placemark {...defualtProps} />);
    wrapper.state('placemark').dragend(event);

    expect(updatePlacemark).toHaveBeenCalled();
  });

  it('should call updatePlacemark on dragend', () => {
    const showBallon = jest.fn();
    const event = {
      get: jest.fn(() => ({ properties: { set: showBallon } }))
    };

    const wrapper = mount(<Placemark {...defualtProps} />);
    wrapper.state('placemark').click(event);

    expect(showBallon).toHaveBeenCalled();
  });
});

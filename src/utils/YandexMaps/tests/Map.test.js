import React from 'react';
import { mount } from 'enzyme';
import Map from '../Map';

describe('Map', () => {
  let wrapper;
  let ymaps;

  const addEvent = jest.fn((eventName, eventFunc) => (ymaps[eventName] = eventFunc));
  const createMap = jest.fn(() => ({
    events: { add: addEvent },
  }));

  ymaps = {
    ready: jest.fn(callback => callback()),
    Map: createMap,
  };

  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };

  it('should create mapInstance', () => {
    const props = {
      width: '100%',
      height: '100vh',
      settings,
      ymaps,
    };

    wrapper = mount(<Map {...props} />);

    expect(wrapper.state('mapInstance')).toBeTruthy();
  });

  it('should call map events handlers', () => {
    const props = {
      width: '100%',
      height: '100vh',
      settings,
      ymaps,
    };

    wrapper = mount(<Map {...props} />);
    wrapper.instance().forceUpdate = jest.fn();

    ymaps.actionend();

    expect(wrapper.instance().forceUpdate).toHaveBeenCalled();
  });

  it('should call captureMapUpdateCallback when given', () => {
    const captureMapUpdateCallback = jest.fn();
    const props = {
      width: '100%',
      height: '100vh',
      settings,
      ymaps,
      captureMapUpdateCallback,
    };

    wrapper = mount(<Map {...props} />);
    expect(captureMapUpdateCallback).toHaveBeenCalled();
  });

  it('should pass ymaps and mapInstance to its children', () => {
    const props = {
      width: '100%',
      height: '100vh',
      settings,
      ymaps,
    };

    const MapChildElement = () => <div />;

    wrapper = mount(
      <Map {...props}>
        <MapChildElement id="child1" />
        <MapChildElement id="child2" />
      </Map>,
    );
    const mapInstance = new ymaps.Map();

    expect(wrapper.find(MapChildElement).map(node => node.prop('ymaps'))).toEqual([ymaps, ymaps]);
    expect(wrapper.find(MapChildElement).map(node => node.prop('mapInstance'))).toEqual([
      mapInstance,
      mapInstance,
    ]);
  });
});

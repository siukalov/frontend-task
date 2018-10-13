import React from 'react';
import { mount } from 'enzyme';
import Map from '../Map';
import YmapsStub from '../../ymapsStub';

describe('Map', () => {
  let wrapper;
  const ymaps = new YmapsStub();

  const settings = {
    center: [55.76, 37.64],
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };

  const defualtProps = {
    width: '100%',
    height: '100vh',
    settings,
    ymaps,
  };

  it('should create mapInstance', () => {
    wrapper = mount(<Map {...defualtProps} />);

    expect(wrapper.state('mapInstance')).toEqual(expect.any(Object));
  });

  it('should call map events handlers', () => {
    const captureMapUpdateCallback = jest.fn();

    wrapper = mount(<Map {...defualtProps} captureMapUpdateCallback={captureMapUpdateCallback} />);
    wrapper.state('mapInstance').actionend();

    expect(captureMapUpdateCallback).toHaveBeenCalled();
  });

  it('should call captureMapUpdateCallback when given', () => {
    const captureMapUpdateCallback = jest.fn();
    const props = {
      ...defualtProps,
      captureMapUpdateCallback,
    };

    wrapper = mount(<Map {...props} />);
    expect(captureMapUpdateCallback).toHaveBeenCalled();
  });

  it('should pass ymaps and mapInstance to its children', () => {
    const MapChildElement = () => <div />;

    wrapper = mount(
      <Map {...defualtProps}>
        <MapChildElement id="child1" />
        <MapChildElement id="child2" />
      </Map>,
    );

    expect(wrapper.find(MapChildElement).map(node => node.prop('ymaps'))).toEqual([ymaps, ymaps]);
    expect(wrapper.find(MapChildElement).map(node => node.prop('mapInstance'))).toEqual([
      expect.any(Object),
      expect.any(Object),
    ]);
  });
});

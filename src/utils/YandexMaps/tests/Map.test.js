import React from 'react';
import { mount } from 'enzyme';
import Map from '../Map';
import YmapsStub from '../../ymapsStub';

describe('Map', () => {
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
    getMapInstance: jest.fn(),
  };

  it('should create map instance', () => {
    const getMapInstance = jest.fn();
    const captureMapUpdate = jest.fn();
    const spy = jest.spyOn(ymaps, 'Map');
    mount(<Map {...defualtProps} getMapInstance={getMapInstance} captureMapUpdate={captureMapUpdate} />);

    expect(getMapInstance).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should call captureMapUpdate', () => {
    const captureMapUpdate = jest.fn();
    const getMapInstance = jest.fn();
    mount(<Map {...defualtProps} getMapInstance={getMapInstance} captureMapUpdate={captureMapUpdate} />);

    expect(captureMapUpdate).toHaveBeenCalled();
  });

  it('should call captureMapUpdate on Map actionend', () => {
    const captureMapUpdate = jest.fn();
    const getMapInstance = jest.fn();
    const wrapper = mount(
      <Map {...defualtProps} getMapInstance={getMapInstance} captureMapUpdate={captureMapUpdate} />,
    );

    wrapper.instance().instance.actionend();
    expect(captureMapUpdate).toHaveBeenCalledTimes(2);
  });
});

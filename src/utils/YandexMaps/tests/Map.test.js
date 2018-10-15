import React from 'react';
import { mount } from 'enzyme';
import Map from '../Map';
import YmapsStub from '../../ymapsStub';

describe('Map', () => {
  const ymaps = new YmapsStub();
  const spy = jest.spyOn(ymaps, 'Map');
  let saveMapInstance;
  let captureMapUpdate;
  let wrapper;
  let props;

  beforeEach(() => {
    saveMapInstance = jest.fn();
    captureMapUpdate = jest.fn();

    const settings = {
      center: [55.76, 37.64],
      zoom: 16,
      controls: ['zoomControl'],
      behaviors: ['drag'],
    };

    props = {
      width: '100%',
      height: '100vh',
      saveMapInstance,
      captureMapUpdate,
      settings,
      ymaps,
    };

    wrapper = mount(<Map {...props} />);
  });

  it('should create map instance', () => {
    expect(saveMapInstance).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });

  it('should call captureMapUpdate', () => {
    expect(captureMapUpdate).toHaveBeenCalled();
  });

  it('should call captureMapUpdate on Map actionend', () => {
    wrapper.instance().instance.actionend();
    expect(captureMapUpdate).toHaveBeenCalledTimes(2);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { CustomMap, mapStateToProps, mapDispatchToProps } from '../Map';

import YmapsStub from '../../utils/ymapsStub';
import preloadedState from '../../utils/preloadedState';

describe('<Map />', () => {
  let wrapper;
  const inititialMapCenter = [60.55, 40.65];

  const settings = {
    center: inititialMapCenter,
    zoom: 16,
    controls: ['zoomControl'],
    behaviors: ['drag'],
  };

  const ymaps = new YmapsStub();

  describe('Render', () => {
    beforeAll(() => {
      const props = {
        width: '100%',
        height: '100vh',
        setCenter: jest.fn(),
        center: inititialMapCenter,
        addPlacemark: jest.fn(),
        updatePlacemark: jest.fn(),
        markers: [],
        settings,
        ymaps,
      };

      wrapper = mount(<CustomMap {...props} />);
    });

    it('should have Map', () => {
      wrapper.update(); // load map
      expect(wrapper.find('Map')).toHaveLength(1);
    });
  });

  describe('Behavior', () => {
    const dispatchSpy = jest.fn();
    const coordinates = [55.76, 37.64];
    let props;

    beforeAll(() => {
      props = {
        width: '100%',
        height: '100vh',
        setCenter: jest.fn(),
        center: coordinates,
        addPlacemark: jest.fn(),
        updatePlacemark: jest.fn(),
        markers: preloadedState.markers,
        settings,
        ymaps,
      };

      wrapper = mount(<CustomMap {...props} />);
    });

    it('should call setCenter if center has changed', () => {
      wrapper.update(); // load map
      expect(props.setCenter).toHaveBeenCalled();
    });

    it('should do mapDispatchToProps for setCenter', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('setCenter');

      mapDispatchToProps(dispatchSpy).setCenter(coordinates);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: 'SAVE_MAP_CENTER',
        center: coordinates,
      });
    });

    it('should do mapDispatchToProps for addPlacemark', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('addPlacemark');

      mapDispatchToProps(dispatchSpy).addPlacemark(0);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: 'ADD_PLACEMARK',
        onMap: true,
        id: 0,
      });
    });

    it('should do mapDispatchToProps for updatePlacemark', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('updatePlacemark');

      mapDispatchToProps(dispatchSpy).updatePlacemark(0, [33, 33]);
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: 'UPDATE_MARKER_COORDS',
        coordinates: [33, 33],
        id: 0,
      });
    });

    it('should do mapStateToProps for center and markers props', () => {
      expect(mapStateToProps(preloadedState)).toEqual(preloadedState);
    });
  });
});

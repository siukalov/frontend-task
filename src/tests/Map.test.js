import React from 'react';
import { mount } from 'enzyme';
import { CustomMap, mapStateToProps, mapDispatchToProps } from '../Map';
import preloadedState from '../utils/preloadedState';
import YmapsStub from '../utils/ymapsStub';
import loadMaps from '../utils/YandexMaps/loadMaps';

jest.mock('../utils/YandexMaps/loadMaps');

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
  loadMaps.mockReturnValue(Promise.resolve(ymaps));

  describe('Rendering', () => {
    beforeAll(() => {
      const props = {
        width: '100%',
        height: '100vh',
        setCenter: jest.fn(),
        center: inititialMapCenter,
        settings,
      };

      wrapper = mount(<CustomMap {...props} />);
    });

    it('should have Map', () => {
      wrapper.update(); // load map
      expect(wrapper.find('Map')).toHaveLength(1);
    });
  });

  describe('Interaction', () => {
    const dispatchSpy = jest.fn();
    const coordinates = [55.76, 37.64];
    let props;

    beforeAll(() => {
      props = {
        width: '100%',
        height: '100vh',
        setCenter: jest.fn(),
        center: coordinates,
        settings,
      };

      wrapper = mount(<CustomMap {...props} />);
    });

    it('should call setCenter if center has changed', () => {
      wrapper.update(); // load map
      expect(props.setCenter).toHaveBeenCalled();
    });

    it('should do mapDispatchToProps', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('setCenter');

      mapDispatchToProps(dispatchSpy).setCenter(coordinates);
      expect(dispatchSpy).toHaveBeenCalledWith({ type: 'SAVE_MAP_CENTER', center: coordinates });
    });

    it('should do mapStateToProps for center and markers props', () => {
      expect(mapStateToProps(preloadedState)).toEqual(preloadedState);
    });
  });
});

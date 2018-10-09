import React from 'react';
import { mount } from 'enzyme';
import Ymaps from '../Ymaps';
import loadMaps from '../loadMaps';

jest.mock('../loadMaps');

describe('Ymaps', () => {
  let wrapper;
  const ymaps = { loaded: true };

  beforeAll(() => {
    loadMaps.mockReturnValue(Promise.resolve(ymaps));
    const Map = props => <div id="map" {...props} />;

    wrapper = mount(
      <Ymaps>
        <Map />
      </Ymaps>,
    );
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should load yandex maps api and pass it down to the child', () => {
    wrapper.update();
    expect(wrapper.find('#map').prop('ymaps')).toEqual(ymaps);
  });
});

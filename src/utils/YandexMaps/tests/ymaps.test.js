import React from 'react';
import { mount } from 'enzyme';
import Ymaps from '../Ymaps';
import * as loadjs from '../loadjs';

describe('Ymaps', () => {
  let wrapper;
  const ymaps = { loaded: true };

  beforeAll(() => {
    loadjs.default = jest.fn(() => ymaps);

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
    expect(wrapper.find('#map').prop('ymaps')).toEqual(ymaps);
  });
});

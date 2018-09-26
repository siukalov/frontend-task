import React from 'react';
import { mount } from 'enzyme';
import { AddMarkerForm, mapDispatchToProps } from '../index';
import { Input, Button } from '../Styled';

describe('<AddMarker />', () => {
  let wrapper;

  describe('Rendering', () => {
    beforeAll(() => {
      wrapper = mount(<AddMarkerForm addMarker={jest.fn()} />);
    });

    it('should have a submit button', () => {
      expect(wrapper.find(Button)).toHaveLength(1);

      expect(wrapper.find(Button).prop('htmlType')).toBe('submit');
    });

    it('should have an input', () => {
      expect(wrapper.find(Input)).toHaveLength(1);
    });
  });

  describe('Interaction', () => {
    const addMarkerSpy = jest.fn();
    const dispatchSpy = jest.fn();

    beforeAll(() => {
      wrapper = mount(<AddMarkerForm addMarker={addMarkerSpy} />);
    });

    it('should call addMarker with a marker name', () => {
      wrapper.find(Input).simulate('change', { target: { value: 'Home' } });
      wrapper.find(Input).simulate('submit');
      expect(addMarkerSpy).toHaveBeenCalledWith('Home');
    });

    it('mapDispatchToProps', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('addMarker');

      mapDispatchToProps(dispatchSpy).addMarker('Home');
      expect(dispatchSpy).toHaveBeenCalledWith({ id: 0, name: 'Home', type: 'ADD_MARKER' });
    });
  });
});

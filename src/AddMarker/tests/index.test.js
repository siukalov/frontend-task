import React from 'react';
import { mount } from 'enzyme';
import { Button, Input } from 'antd';
import { AddMarkerForm, mapDispatchToProps } from '../index';

describe('<AddMarker />', () => {
  let wrapper;

  describe('Render', () => {
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

  describe('Behavior', () => {
    let addMarkerSpy;
    let dispatchSpy;

    beforeEach(() => {
      addMarkerSpy = jest.fn();
      dispatchSpy = jest.fn();
      wrapper = mount(<AddMarkerForm addMarker={addMarkerSpy} />);
    });

    it('should call addMarker with a marker name on submit', () => {
      wrapper.find(Input).simulate('change', { target: { value: 'Home' } });
      wrapper.find(Input).simulate('submit');
      expect(addMarkerSpy).toHaveBeenCalledWith('Home');
    });

    it('should do mapDispatchToProps', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('addMarker');

      mapDispatchToProps(dispatchSpy).addMarker('Home');
      expect(dispatchSpy).toHaveBeenCalledWith({ id: 0, name: 'Home', type: 'ADD_MARKER' });
    });
  });
});

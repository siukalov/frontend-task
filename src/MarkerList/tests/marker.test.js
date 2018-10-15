import React from 'react';
import { mount } from 'enzyme';
import { Item, Button } from '../Styled';
import { Marker } from '../Marker';

describe('<Marker />', () => {
  let wrapper;
  const onRemoveSpy = jest.fn();

  describe('Render', () => {
    beforeAll(() => {
      wrapper = mount(<Marker onRemove={onRemoveSpy} name="Home" id={0} />);
    });

    it('should render a remove button', () => {
      expect(wrapper.find(Button).prop('type')).toBe('danger');
    });

    it("should render a marker's name", () => {
      expect(wrapper.find(Item).text()).toBe('Home');
    });
  });

  describe('Behavior', () => {
    beforeAll(() => {
      wrapper = mount(<Marker onRemove={onRemoveSpy} name="Home" id={0} />);
    });

    it('should call onRemove when remove button is clicked', () => {
      wrapper.find(Button).simulate('click');
      expect(onRemoveSpy).toHaveBeenCalled();
    });
  });
});

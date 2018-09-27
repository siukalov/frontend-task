import React from 'react';
import { mount } from 'enzyme';
import { MarkerList, mapStateToProps, mapDispatchToProps } from '../index';
import { Item } from '../Styled';
import preloadedState from './preloadedState';

describe('<MarkerList />', () => {
  let wrapper;
  const handleRemoveSpy = jest.fn();
  const { markers } = preloadedState;

  describe('Rendering', () => {
    beforeAll(() => {
      wrapper = mount(<MarkerList handleRemove={handleRemoveSpy} markers={markers} />);
    });

    it('should render added markers in the list', () => {
      expect(wrapper.find(Item)).toHaveLength(3);
    });
  });

  describe('Interaction', () => {
    let dispatchSpy = jest.fn();

    beforeEach(() => {
      dispatchSpy = jest.fn();
    });

    it('mapDispatchToProps handleRemove', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('handleRemove');

      mapDispatchToProps(dispatchSpy).handleRemove(0);
      expect(dispatchSpy).toHaveBeenCalledWith({ id: 0, type: 'REMOVE_MARKER' });
    });

    it('mapDispatchToProps onSortEnd', () => {
      expect(mapDispatchToProps(dispatchSpy)).toHaveProperty('onSortEnd');

      const oldIndex = 0;
      const newIndex = 1;
      mapDispatchToProps(dispatchSpy).onSortEnd({ oldIndex, newIndex });
      expect(dispatchSpy).toHaveBeenCalledWith({
        oldIndex: 0,
        newIndex: 1,
        type: 'REORDER_MARKERS',
      });
    });

    it('mapStateToProps markers', () => {
      expect(mapStateToProps(preloadedState)).toEqual({ markers });
    });
  });
});

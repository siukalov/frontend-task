import * as actions from '../actions';
import * as types from '../actionTypes';

describe('Actions', () => {
  it('should create an action to add a marker ', () => {
    const name = 'Home';

    const expectedAction = {
      type: types.ADD_MARKER,
      id: 0,
      name,
    };

    expect(actions.addMarker(name)).toEqual(expectedAction);
  });

  it('should create an action to remove a marker ', () => {
    const id = 2;

    const expectedAction = {
      type: types.REMOVE_MARKER,
      id: 2,
    };

    expect(actions.removeMarker(id)).toEqual(expectedAction);
  });

  it('should create an action to reorder markers ', () => {
    const oldIndex = 1;
    const newIndex = 4;

    const expectedAction = {
      type: types.REORDER_MARKERS,
      oldIndex,
      newIndex,
    };

    expect(actions.reorderMarkers(oldIndex, newIndex)).toEqual(expectedAction);
  });

  it('should create an action to save map center ', () => {
    const center = [55.77115966031854, 37.670387870739184];

    const expectedAction = {
      type: types.SAVE_MAP_CENTER,
      center,
    };

    expect(actions.saveCenter(center)).toEqual(expectedAction);
  });
});

import Immutable from 'seamless-immutable';
import reducer from '../reducer';
import * as actions from '../actions';

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      center: null,
      markers: [],
    });
  });

  it('should handle ADD_MARKER with the initial state', () => {
    const markerName = 'Home';
    const state = undefined;
    const nextState = {
      center: null,
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false,
        },
      ],
    };

    expect(reducer(state, actions.addMarker(markerName))).toEqual(nextState);
  });

  it('should handle ADD_MARKER with the existing state', () => {
    const markerName = 'Work';
    const state = Immutable({
      center: null,
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false,
        },
      ],
    });

    const nextState = {
      center: null,
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false,
        },
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false,
        },
      ],
    };
    expect(reducer(state, actions.addMarker(markerName))).toEqual(nextState);
  });

  it('should handle REMOVE_MARKER', () => {
    const markerId = 0;
    const state = Immutable({
      center: null,
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false,
        },
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false,
        },
      ],
    });

    const nextState = {
      center: null,
      markers: [
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false,
        },
      ],
    };
    expect(reducer(state, actions.removeMarker(markerId))).toEqual(nextState);
  });

  it('should handle REORDER_MARKERS with the existing state', () => {
    const oldIndex = 0;
    const newIndex = 1;
    const state = Immutable({
      center: null,
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false,
        },
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false,
        },
      ],
    });

    const nextState = {
      center: null,
      markers: [
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false,
        },
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false,
        },
      ],
    };
    expect(reducer(state, actions.reorderMarkers(oldIndex, newIndex))).toEqual(nextState);
  });
});

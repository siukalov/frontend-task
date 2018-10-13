import Immutable from 'seamless-immutable';
import reducer from '../reducer';
import * as actions from '../actions';

describe('Reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      center: null,
      markers: []
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
          onMap: false
        }
      ]
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
          onMap: false
        }
      ]
    });

    const nextState = {
      center: null,
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false
        },
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false
        }
      ]
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
          onMap: false
        },
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false
        }
      ]
    });

    const nextState = {
      center: null,
      markers: [
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false
        }
      ]
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
          onMap: false
        },
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false
        }
      ]
    });

    const nextState = {
      center: null,
      markers: [
        {
          id: 1,
          name: 'Work',
          coordinates: null,
          onMap: false
        },
        {
          id: 0,
          name: 'Home',
          coordinates: null,
          onMap: false
        }
      ]
    };
    expect(reducer(state, actions.reorderMarkers(oldIndex, newIndex))).toEqual(
      nextState
    );
  });

  it('should handle SAVE_MAP_CENTER', () => {
    const state = Immutable({
      center: null,
      markers: []
    });

    const newCenter = [55.77115966031854, 37.670387870739184];

    const nextState = Immutable({
      center: newCenter,
      markers: []
    });

    expect(reducer(state, actions.saveCenter(newCenter))).toEqual(nextState);
  });

  it('should handle ADD_PLACEMARK', () => {
    const state = Immutable({
      center: [55, 38],
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: [55, 38],
          onMap: false
        }
      ]
    });

    const nextState = Immutable({
      center: [55, 38],
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: [55, 38],
          onMap: true
        }
      ]
    });

    expect(reducer(state, actions.addPlacemark(0))).toEqual(nextState);
  });

  it('should handle UPDATE_MARKER_COORDS', () => {
    const state = Immutable({
      center: [55, 38],
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: [55, 38],
          onMap: true
        }
      ]
    });

    const newCoordinates = [33, 33];

    const nextState = Immutable({
      center: [55, 38],
      markers: [
        {
          id: 0,
          name: 'Home',
          coordinates: newCoordinates,
          onMap: true
        }
      ]
    });

    expect(
      reducer(state, actions.updateMarkerCoords(0, newCoordinates))
    ).toEqual(nextState);
  });
});

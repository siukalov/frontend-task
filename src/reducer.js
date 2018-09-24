import Immutable from 'seamless-immutable';
import { ADD_MARKER, REMOVE_MARKER, REORDER_MARKERS } from './actionTypes';

const initialState = Immutable({
  center: null,
  markers: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_MARKER:
      return state.merge({
        markers: [
          ...state.markers,
          {
            id: action.id,
            name: action.name,
            coordinates: state.center,
            onMap: false,
          },
        ],
      });
    case REMOVE_MARKER:
    case REORDER_MARKERS:
    default:
      return state;
  }
};

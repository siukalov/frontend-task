import Immutable from 'seamless-immutable';
import reject from 'lodash/reject';
import { arrayMove } from 'react-sortable-hoc';
import {
  ADD_MARKER, REMOVE_MARKER, REORDER_MARKERS, SAVE_MAP_CENTER,
} from './actionTypes';

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
      return state.merge({
        markers: reject(state.markers, { id: action.id }),
      });
    case REORDER_MARKERS:
      return state.merge({
        markers: arrayMove([...state.markers], action.oldIndex, action.newIndex),
      });
    case SAVE_MAP_CENTER:
      return state.merge({
        center: action.center,
      });
    default:
      return state;
  }
};

import Immutable from 'seamless-immutable';
import reject from 'lodash/reject';
import { arrayMove } from 'react-sortable-hoc';
import * as actionTypes from './actionTypes';

const initialState = Immutable({
  center: null,
  markers: [],
});

const updateMarker = (action, field) => (marker) => {
  if (marker.id === action.id) {
    return { ...marker, [field]: action[field] };
  }

  return marker;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_MARKER:
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
    case actionTypes.REMOVE_MARKER:
      return state.merge({
        markers: reject(state.markers, { id: action.id }),
      });
    case actionTypes.REORDER_MARKERS:
      return state.merge({
        markers: arrayMove([...state.markers], action.oldIndex, action.newIndex),
      });
    case actionTypes.SAVE_MAP_CENTER:
      return state.merge({
        center: action.center,
      });
    case actionTypes.UPDATE_MARKER_COORDS:
      return state.merge({
        markers: state.markers.map(updateMarker(action, 'coordinates')),
      });
    case actionTypes.ADD_PLACEMARK:
      return state.merge({
        markers: state.markers.map(updateMarker(action, 'onMap')),
      });
    default:
      return state;
  }
};

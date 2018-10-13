import {
  ADD_MARKER,
  REMOVE_MARKER,
  REORDER_MARKERS,
  SAVE_MAP_CENTER,
  ADD_PLACEMARK,
  UPDATE_MARKER_COORDS,
} from './actionTypes';

const createCounter = () => {
  let counter = -1;
  return () => {
    counter += 1;
    return counter;
  };
};

const getSequentialId = createCounter();

export const addMarker = name => ({
  type: ADD_MARKER,
  id: getSequentialId(),
  name,
});

export const removeMarker = id => ({
  type: REMOVE_MARKER,
  id,
});

export const reorderMarkers = (oldIndex, newIndex) => ({
  type: REORDER_MARKERS,
  oldIndex,
  newIndex,
});

export const saveCenter = center => ({
  type: SAVE_MAP_CENTER,
  center,
});

export const updateMarkerCoords = (id, coordinates) => ({
  type: UPDATE_MARKER_COORDS,
  id,
  coordinates,
});

export const addPlacemark = id => ({
  type: ADD_PLACEMARK,
  onMap: true,
  id,
});

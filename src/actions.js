import { ADD_MARKER, REMOVE_MARKER, REORDER_MARKERS } from './actionTypes';

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

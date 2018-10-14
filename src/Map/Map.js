import React from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import Ymaps from '../utils/YandexMaps/Ymaps';
import Map from '../utils/YandexMaps/Map';
import Placemark from '../utils/YandexMaps/Placemark';
import { saveCenter, addPlacemark, updateMarkerCoords } from '../actions';

const captureMapUpdate = (props, map) => {
  const { instance, route } = map;

  const {
    markers, center, setCenter, ymaps,
  } = props;

  const currentCenter = instance.getCenter();

  if (!isEqual(center, currentCenter)) {
    setCenter(currentCenter);
  }

  const coordinates = markers.map(marker => marker.coordinates);

  // TODO: refactor
  if (!isEqual(route.geometry.getCoordinates(), coordinates)) {
    route.geometry.setCoordinates(coordinates);
  }
};

const CustomMap = (props) => {
  const { markers } = props;

  return (
    <Map width="100%" height="100vh" {...props} captureMapUpdateCallback={captureMapUpdate}>
      {markers.map(marker => (
        <Placemark {...props} key={marker.id} marker={marker} />
      ))}
    </Map>
  );
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  setCenter: coordinates => dispatch(saveCenter(coordinates)),
  addPlacemark: id => dispatch(addPlacemark(id)),
  updatePlacemark: (id, coordinates) => dispatch(updateMarkerCoords(id, coordinates)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomMap);

export { CustomMap, mapStateToProps, mapDispatchToProps };

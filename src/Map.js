import React from 'react';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import Ymaps from './utils/YandexMaps/Ymaps';
import Map from './utils/YandexMaps/Map';
import { saveCenter } from './actions';

const captureMapUpdate = (props, state) => {
  const { mapInstance } = state;
  const { center, setCenter } = props;

  const currentCenter = mapInstance.getCenter();
  console.log('center, currentCenter', center, currentCenter);

  if (!isEqual(center, currentCenter)) {
    setCenter(currentCenter);
  }
};

const CustomMap = props => (
  <Ymaps>
    <Map width="100%" height="100vh" {...props} captureMapUpdateCallback={captureMapUpdate} />
  </Ymaps>
);

const mapStateToProps = state => ({
  center: state.center,
  markers: state.markers,
});

const mapDispatchToProps = dispatch => ({
  setCenter: coordinates => dispatch(saveCenter(coordinates)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomMap);

export { CustomMap, mapStateToProps, mapDispatchToProps };

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import throttle from 'lodash/throttle';
import { connect } from 'react-redux';
import Map from '../utils/YandexMaps/Map';
import Route from './Route';
import { saveCenter, addMarkerOnMap, updateMarkerCoords } from '../actions';

class CustomMap extends Component {
  state = { map: null };

  static defaultProps = {
    center: null,
  };

  static propTypes = {
    ymaps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    settings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setCenter: PropTypes.func.isRequired,
    addPlacemark: PropTypes.func.isRequired,
    movePlacemark: PropTypes.func.isRequired,
    center: PropTypes.arrayOf(PropTypes.number.isRequired),
    markers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        onMap: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  };

  captureMapUpdate = (map) => {
    const { center, setCenter } = this.props;
    const currentCenter = map.getCenter();

    if (!isEqual(center, currentCenter)) {
      setCenter(currentCenter);
    }
  };

  saveMapInstance = map => this.setState({ map });

  render() {
    const {
      ymaps, markers, settings, addPlacemark, movePlacemark,
    } = this.props;
    const { map } = this.state;

    return (
      <Map
        width="100%"
        height="100vh"
        ymaps={ymaps}
        settings={settings}
        saveMapInstance={this.saveMapInstance}
        captureMapUpdate={this.captureMapUpdate}
      >
        {map && (
          <Route ymaps={ymaps} map={map} markers={markers} addPlacemark={addPlacemark} movePlacemark={movePlacemark} />
        )}
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

// call once per 17ms ≈ 1 second / 60 frames
const throttledUpdateMarkerCoords = throttle(
  (dispatch, id, coordinates) => dispatch(updateMarkerCoords(id, coordinates)),
  17,
);

const mapDispatchToProps = dispatch => ({
  setCenter: coordinates => dispatch(saveCenter(coordinates)),
  addPlacemark: id => dispatch(addMarkerOnMap(id)),
  movePlacemark: (id, coordinates) => throttledUpdateMarkerCoords(dispatch, id, coordinates),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomMap);

export { CustomMap, mapStateToProps, mapDispatchToProps };

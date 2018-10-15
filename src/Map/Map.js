import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { connect } from 'react-redux';
import Map from '../utils/YandexMaps/Map';
import Route from './Route';
import { saveCenter, addMarkerOnMap, updateMarkerCoords } from '../actions';

class CustomMap extends Component {
  state = { instance: null };

  static propTypes = {
    ymaps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    settings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    setCenter: PropTypes.func.isRequired,
    addPlacemark: PropTypes.func.isRequired,
    updatePlacemark: PropTypes.func.isRequired,
    center: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    markers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        onMap: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  };

  captureMapUpdate = (instance) => {
    const { center, setCenter } = this.props;
    const currentCenter = instance.getCenter();

    if (!isEqual(center, currentCenter)) {
      setCenter(currentCenter);
    }
  };

  saveMapInstance = instance => this.setState({ instance });

  render() {
    const {
      ymaps, markers, settings, addPlacemark, updatePlacemark,
    } = this.props;
    const { instance } = this.state;

    return (
      <Map
        width="100%"
        height="100vh"
        settings={settings}
        ymaps={ymaps}
        saveMapInstance={this.saveMapInstance}
        captureMapUpdate={this.captureMapUpdate}
      >
        {instance && (
          <Route
            ymaps={ymaps}
            instance={instance}
            markers={markers}
            addPlacemark={addPlacemark}
            updatePlacemark={updatePlacemark}
          />
        )}
      </Map>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  setCenter: coordinates => dispatch(saveCenter(coordinates)),
  addPlacemark: id => dispatch(addMarkerOnMap(id)),
  updatePlacemark: (id, coordinates) => dispatch(updateMarkerCoords(id, coordinates)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CustomMap);

export { CustomMap, mapStateToProps, mapDispatchToProps };

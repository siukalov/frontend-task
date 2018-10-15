import React, { Component, Fragment } from 'react';
import isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import Placemark from '../utils/YandexMaps/Placemark';

class Route extends Component {
  state = { route: null };

  static propTypes = {
    ymaps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    map: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    markers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
        onMap: PropTypes.bool.isRequired,
      }),
    ).isRequired,
  };

  componentDidMount() {
    const { ymaps, map } = this.props;
    ymaps.ready(() => {
      const route = new ymaps.Polyline(
        [],
        {},
        {
          strokeColor: '#000000',
          strokeWidth: 4,
          strokeStyle: '1 3',
        },
      );
      map.geoObjects.add(route);
      this.setState({ route });
    });
  }

  componentDidUpdate(prevProps) {
    const { markers } = this.props;

    if (!isEqual(prevProps.markers, markers)) {
      this.captureRouteUpdate();
    }
  }

  captureRouteUpdate = () => {
    const { route } = this.state;
    const { markers } = this.props;

    const coordinates = markers.map(marker => marker.coordinates);

    route.geometry.setCoordinates(coordinates);
  };

  render() {
    const { markers, ymaps } = this.props;
    return (
      <Fragment>
        {markers.map(marker => (
          <Placemark {...this.props} ymaps={ymaps} key={marker.id} marker={marker} />
        ))}
      </Fragment>
    );
  }
}

export default Route;

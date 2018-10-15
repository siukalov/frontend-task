import { Component } from 'react';
import PropTypes from 'prop-types';

class Placemark extends Component {
  state = { placemark: null };

  // see https://github.com/facebook/react/issues/6653
  static defaultProps = {
    ymaps: undefined,
    map: undefined,
  };

  static propTypes = {
    ymaps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    map: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    addPlacemark: PropTypes.func.isRequired,
    updatePlacemark: PropTypes.func.isRequired,
    marker: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      onMap: PropTypes.bool.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const placemark = this.createPlacemark();
    this.addOnMap(placemark);
    this.updatePlacemarkOnDragend(placemark);
  }

  componentWillUnmount() {
    const { placemark } = this.state;
    const { map } = this.props;

    map.geoObjects.remove(placemark);
  }

  createPlacemark = () => {
    const { ymaps, marker } = this.props;

    return new ymaps.Placemark(
      marker.coordinates,
      {
        balloonContent: marker.name,
      },
      {
        draggable: true,
        hasBalloon: true,
        preset: 'islands#blueIcon',
      },
    );
  };

  addOnMap = (placemark) => {
    const { map, marker, addPlacemark } = this.props;
    this.setState({ placemark });

    // add placemark on the Map
    map.geoObjects.add(placemark);
    addPlacemark(marker.id);
  };

  updatePlacemarkOnDragend = (placemark) => {
    const { marker, updatePlacemark } = this.props;

    placemark.events.add('dragend', (e) => {
      const thisPlacemark = e.get('target');
      const newCoordinates = thisPlacemark.geometry.getCoordinates();
      updatePlacemark(marker.id, newCoordinates);
    });
  };

  render() {
    return null;
  }
}

export default Placemark;

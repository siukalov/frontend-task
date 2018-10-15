import { Component } from 'react';
import PropTypes from 'prop-types';

class Placemark extends Component {
  state = { placemark: null };

  static propTypes = {
    ymaps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    map: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
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
    this.updatePlacemarkOndrag(placemark);
  }

  componentWillUnmount() {
    const { placemark } = this.state;
    const { map } = this.props;

    map.geoObjects.remove(placemark);
  }

  createPlacemark = () => {
    const { ymaps, marker } = this.props;
    const { coordinates } = marker;
    const styles = {
      draggable: true,
      hasBalloon: true,
      preset: 'islands#blueIcon',
    };
    const options = {
      balloonContent: marker.name,
    };

    return new ymaps.Placemark(coordinates, options, styles);
  };

  addOnMap = (placemark) => {
    const { map, marker, addPlacemark } = this.props;
    this.setState({ placemark });

    // add placemark on the Map
    map.geoObjects.add(placemark);
    addPlacemark(marker.id);
  };

  updatePlacemarkOndrag = (placemark) => {
    const { marker, updatePlacemark } = this.props;

    placemark.events.add('drag', (e) => {
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

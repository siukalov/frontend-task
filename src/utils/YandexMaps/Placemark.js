import { Component } from 'react';
import PropTypes from 'prop-types';

class Placemark extends Component {
  state = { placemark: null };

  // see https://github.com/facebook/react/issues/6653
  static defaultProps = {
    ymaps: undefined,
    mapInstance: undefined,
  };

  static propTypes = {
    marker: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      onMap: PropTypes.bool.isRequired,
    }).isRequired,
    ymaps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    mapInstance: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    addPlacemark: PropTypes.func.isRequired,
    updatePlacemark: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const placemark = this.createPlacemark();
    this.addOnMap(placemark);
    this.updatePlacemarkOnDragend(placemark);
    this.showBaloonOnClick(placemark);
  }

  componentWillUnmount() {
    const { placemark } = this.state;
    const { mapInstance } = this.props;

    mapInstance.geoObjects.remove(placemark);
  }

  createPlacemark = () => {
    const { ymaps, marker } = this.props;

    return new ymaps.Placemark(
      marker.coordinates,
      {},
      {
        draggable: true,
        preset: 'islands#whiteStretchyIcon',
      },
    );
  };

  addOnMap = (placemark) => {
    const { mapInstance, marker, addPlacemark } = this.props;
    this.setState({ placemark });

    // add placemark on the Map
    mapInstance.geoObjects.add(placemark);
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

  showBaloonOnClick = (placemark) => {
    const { marker } = this.props;

    placemark.events.add('click', (e) => {
      const thisPlacemark = e.get('target');
      thisPlacemark.properties.set('balloonContent', marker.name);
    });
  };

  render() {
    return null;
  }
}

export default Placemark;

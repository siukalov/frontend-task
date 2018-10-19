import { Component } from 'react';
import PropTypes from 'prop-types';

class Placemark extends Component {
  static propTypes = {
    ymaps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    map: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    properties: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    options: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    savePlacemarkInstance: PropTypes.func.isRequired,
    addPlacemarkCallback: PropTypes.func.isRequired,
    movePlacemarkCallback: PropTypes.func.isRequired,
    balloonOpenCallback: PropTypes.func.isRequired,
  };

  placemark = null;

  componentDidMount() {
    const { savePlacemarkInstance } = this.props;
    this.placemark = this.createPlacemark();
    savePlacemarkInstance(this.placemark);

    this.addOnMap();
    this.movePlacemark();
    this.openBalloon();
  }

  componentWillUnmount() {
    const { map } = this.props;

    map.geoObjects.remove(this.placemark);
  }

  createPlacemark = () => {
    const {
      ymaps, coordinates, properties, options,
    } = this.props;

    return new ymaps.Placemark(coordinates, properties, options);
  };

  addOnMap = () => {
    const { map, addPlacemarkCallback } = this.props;

    // add placemark on the Map
    map.geoObjects.add(this.placemark);
    addPlacemarkCallback();
  };

  movePlacemark = () => {
    const { movePlacemarkCallback } = this.props;

    this.placemark.events.add('drag', (e) => {
      const thisPlacemark = e.get('target');
      const newCoordinates = thisPlacemark.geometry.getCoordinates();
      movePlacemarkCallback(newCoordinates);
    });
  };

  openBalloon = () => {
    const { balloonOpenCallback } = this.props;

    this.placemark.events.add('balloonopen', () => {
      balloonOpenCallback(this.placemark);
    });
  };

  render() {
    return null;
  }
}

export default Placemark;

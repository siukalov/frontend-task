import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { memoize } from 'lodash/function';
import Placemark from '../utils/YandexMaps/Placemark';

class CustomPlacemark extends Component {
  state = { placemark: null };

  static propTypes = {
    ymaps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    map: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    addPlacemark: PropTypes.func.isRequired,
    movePlacemark: PropTypes.func.isRequired,
    marker: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      onMap: PropTypes.bool.isRequired,
    }).isRequired,
  };

  shouldComponentUpdate(nextProps) {
    const {
      marker: { coordinates },
    } = this.props;

    const {
      marker: { coordinates: newCoordinates },
    } = nextProps;

    return !isEqual(coordinates, newCoordinates);
  }

  // eslint-disable-next-line react/sort-comp
  geocode = (coordinates) => {
    const { ymaps } = this.props;
    return ymaps.geocode(coordinates, {
      results: 1,
    });
  };

  // use memoize to cache geocode results
  getAddress = memoize(this.geocode, coordinates => coordinates.join('_'));

  savePlacemarkInstance = (placemark) => {
    this.setState({ placemark });
  };

  addPlacemarkCallback = () => {
    const {
      addPlacemark,
      marker: { id },
    } = this.props;

    addPlacemark(id);
  };

  movePlacemarkCallback = (newCoordinates) => {
    const {
      movePlacemark,
      marker: { id },
    } = this.props;

    movePlacemark(id, newCoordinates);
  };

  balloonOpenCallback = () => {
    const { placemark } = this.state;
    const {
      marker: { coordinates },
    } = this.props;

    placemark.properties.set('balloonContentBody', 'Идет загрузка данных...');
    this.getAddress(coordinates).then((res) => {
      const newContent = res.geoObjects.get(0)
        ? res.geoObjects.get(0).properties.get('name')
        : 'Не удалось определить адрес.';
      placemark.properties.set('balloonContentBody', newContent);
    });
  };

  render() {
    const { placemark } = this.state;
    const {
      addPlacemark, movePlacemark, marker, ...passThroughProps
    } = this.props;
    const { id, name, coordinates } = marker;

    const properties = {
      balloonContentHeader: name,
    };

    const options = {
      draggable: true,
      hasBalloon: true,
      preset: 'islands#blueIcon',
    };

    const props = {
      coordinates,
      options,
      properties,
      ...passThroughProps,
    };

    return (
      <Placemark
        key={id}
        placemark={placemark}
        savePlacemarkInstance={this.savePlacemarkInstance}
        addPlacemarkCallback={this.addPlacemarkCallback}
        movePlacemarkCallback={this.movePlacemarkCallback}
        balloonOpenCallback={this.balloonOpenCallback}
        {...props}
      />
    );
  }
}

export default CustomPlacemark;

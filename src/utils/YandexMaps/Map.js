import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';

class Map extends Component {
  // see https://github.com/facebook/react/issues/6653
  static defaultProps = {
    children: undefined,
    ymaps: undefined,
    captureMapUpdateCallback: undefined,
  };

  static propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    ymaps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    captureMapUpdateCallback: PropTypes.func,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  };

  mapParentNode = React.createRef();

  instance = null;

  route = null;

  componentDidMount() {
    const { ymaps, settings, captureMapUpdateCallback } = this.props;

    ymaps.ready(() => {
      this.instance = new ymaps.Map(this.mapParentNode.current, settings);
      this.route = new ymaps.Polyline(
        [],
        {},
        {
          strokeColor: '#000000',
          strokeWidth: 4,
          strokeStyle: '1 3',
        },
      );

      this.instance.geoObjects.add(this.route);

      if (captureMapUpdateCallback) {
        const map = { instance: this.instance, route: this.route };

        // pass Map data to React when the Map has been initialized
        captureMapUpdateCallback(this.props, map);

        // pass Map data to React when the Map has been updated
        this.instance.events.add('actionend', () => captureMapUpdateCallback(this.props, map));
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { captureMapUpdateCallback, markers } = this.props;
    if (!isEqual(prevProps.markers, markers)) {
      const map = { instance: this.instance, route: this.route };
      captureMapUpdateCallback(this.props, map);
    }
  }

  render() {
    const {
      width, height, children, ymaps,
    } = this.props;

    return (
      <div style={{ width, height }} ref={this.mapParentNode}>
        {this.instance
          && React.Children.map(children, child => React.cloneElement(child, { ymaps, instance: this.instance }))}
      </div>
    );
  }
}

export default Map;

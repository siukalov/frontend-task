import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  // see https://github.com/facebook/react/issues/6653
  static defaultProps = {
    children: undefined,
    ymaps: undefined,
    captureMapUpdateCallback: undefined
  };

  static propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    ymaps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    captureMapUpdateCallback: PropTypes.func,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ])
  };

  state = { mapInstance: null };

  mapParentNode = React.createRef();

  componentDidMount() {
    const { ymaps, settings, captureMapUpdateCallback } = this.props;

    let mapInstance;

    ymaps.ready(() => {
      mapInstance = new ymaps.Map(this.mapParentNode.current, settings);
      this.setState({ mapInstance });

      if (captureMapUpdateCallback) {
        // pass Map data to React when the Map has been initialized
        captureMapUpdateCallback(this.props, { mapInstance });

        // pass Map data to React when the Map has been updated
        mapInstance.events.add('actionend', () =>
          captureMapUpdateCallback(this.props, this.state)
        );
      }
    });
  }

  render() {
    const { width, height, children, ymaps } = this.props;
    const { mapInstance } = this.state;

    return (
      <div style={{ width, height }} ref={this.mapParentNode}>
        {mapInstance &&
          React.Children.map(children, child =>
            React.cloneElement(child, { ymaps, mapInstance })
          )}
      </div>
    );
  }
}

export default Map;

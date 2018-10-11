import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
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

  state = { mapInstance: null };

  mapParentNode = React.createRef();

  static getDerivedStateFromProps(props, state) {
    const { captureMapUpdateCallback } = props;
    const { mapInstance } = state;

    if (mapInstance && captureMapUpdateCallback) {
      captureMapUpdateCallback(props, state);
    }

    return null;
  }

  componentDidMount() {
    const { ymaps, settings } = this.props;

    let mapInstance;

    ymaps.ready(() => {
      mapInstance = new ymaps.Map(this.mapParentNode.current, settings);
      mapInstance.events.add('actionend', () => this.forceUpdate()); // notify React the map has updated
      this.setState({ mapInstance });
    });
  }

  render() {
    const {
      width, height, children, ymaps,
    } = this.props;
    const { mapInstance } = this.state;

    return (
      <div style={{ width, height }} ref={this.mapParentNode}>
        {React.Children.map(children, child => React.cloneElement(child, { ymaps, mapInstance }))}
      </div>
    );
  }
}

export default Map;

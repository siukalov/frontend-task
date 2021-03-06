import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Map extends Component {
  static defaultProps = {
    children: undefined,
  };

  static propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    settings: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    ymaps: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    saveMapInstance: PropTypes.func.isRequired,
    captureMapUpdate: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  };

  mapParentNode = React.createRef();

  instance = null;

  componentDidMount() {
    const {
      ymaps, settings, saveMapInstance, captureMapUpdate,
    } = this.props;

    ymaps.ready(() => {
      this.instance = new ymaps.Map(this.mapParentNode.current, settings);
      // pass Map to React when it has been initialized
      captureMapUpdate(this.instance);

      // pass Map to React data when it has been updated
      this.instance.events.add('actionend', () => captureMapUpdate(this.instance));
      saveMapInstance(this.instance);
    });
  }

  render() {
    const { width, height, children } = this.props;

    return (
      <div style={{ width, height }} ref={this.mapParentNode}>
        {children}
      </div>
    );
  }
}

export default Map;

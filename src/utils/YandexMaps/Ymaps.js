import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadMaps from './loadMaps';

class Ymaps extends Component {
  state = { ymaps: null };

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    loadMaps().then(ymaps => this.setState({ ymaps }));
  }

  createMapContainer = (ymaps) => {
    const { children, ...passThroughProps } = this.props;
    const props = { ymaps, ...passThroughProps };
    return React.cloneElement(React.Children.only(children), props);
  };

  render() {
    const { ymaps } = this.state;
    return ymaps && this.createMapContainer(ymaps);
  }
}

export default Ymaps;

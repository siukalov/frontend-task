import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadMaps from './loadjs';

class Ymaps extends Component {
  state = { ymaps: null };

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    const ymaps = loadMaps();
    this.setState({ ymaps });
  }

  getChildren = () => {
    const { children } = this.props;
    const { ymaps } = this.state;
    let childrenWithYmaps = null;

    if (ymaps) {
      childrenWithYmaps = React.Children.map(children, child => React.cloneElement(child, { ymaps }));
      return childrenWithYmaps;
    }

    return childrenWithYmaps;
  };

  render() {
    const children = this.getChildren();
    return <React.Fragment>{children}</React.Fragment>;
  }
}

export default Ymaps;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import loadMaps from './loadMaps';

class Ymaps extends Component {
  state = { ymaps: null };

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentDidMount() {
    console.log('componentDidMount');
    loadMaps().then(ymaps => console.log('ymaps', ymaps) || this.setState({ ymaps }));
  }

  getChildren = () => {
    console.log('getChildren');
    const { children } = this.props;
    const { ymaps } = this.state;

    console.log('@@ ymaps', ymaps);
    let childrenWithYmaps = null;

    childrenWithYmaps = React.Children.map(children, child => React.cloneElement(child, { ymaps }));
    return childrenWithYmaps;
  };

  render() {
    console.log('render');
    const { ymaps } = this.state;

    const children = this.getChildren();
    return <React.Fragment>{ymaps && children}</React.Fragment>;
  }
}

export default Ymaps;

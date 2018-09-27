import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer } from 'react-sortable-hoc';
import { List } from './Styled';
import Marker from './Marker';

const MarkerList = ({ markers, handleRemove }) => (
  <List
    dataSource={markers}
    split={false}
    size="small"
    locale={{ emptyText: '' }}
    renderItem={(marker, index) => (
      <Marker key={marker.id} index={index} {...marker} onRemove={handleRemove} />
    )}
  />
);

MarkerList.propTypes = {
  markers: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  handleRemove: PropTypes.func.isRequired,
};

export default SortableContainer(MarkerList);

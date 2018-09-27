import React from 'react';
import PropTypes from 'prop-types';
import { SortableElement } from 'react-sortable-hoc';
import { Item, Button } from './Styled';

const RemoveButton = ({ onClick, id }) => (
  <Button type="danger" shape="circle" icon="minus" onClick={() => onClick(id)} />
);

RemoveButton.propTypes = {
  id: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

const Marker = ({ name, id, onRemove }) => (
  <Item actions={[<RemoveButton onClick={onRemove} id={id} />]}>{name}</Item>
);

Marker.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default SortableElement(Marker);
export { Marker };

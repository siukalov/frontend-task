import { connect } from 'react-redux';
import { removeMarker, reorderMarkers } from '../actions';
import MarkerList from './MarkerList';

const mapStateToProps = state => ({
  markers: state.markers,
});

const mapDispatchToProps = dispatch => ({
  handleRemove: id => dispatch(removeMarker(id)),
  onSortEnd: ({ oldIndex, newIndex }) => dispatch(reorderMarkers(oldIndex, newIndex)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarkerList);

export { MarkerList, mapStateToProps, mapDispatchToProps };

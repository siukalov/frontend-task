import { connect } from 'react-redux';
import { addMarker } from '../actions';
import AddMarkerForm from './AddMarkerForm';

const mapDispatchToProps = dispatch => ({
  addMarker: name => dispatch(addMarker(name)),
});

export { AddMarkerForm, mapDispatchToProps };

export default connect(
  null,
  mapDispatchToProps,
)(AddMarkerForm);

import React from 'react';
import isUndefined from 'lodash/isUndefined';
import { connect } from 'react-redux';
import { addMarker } from '../actions';
import {
  Input, Form, FormInput, FormItem, Button, MarkerForm,
} from './Styled';

const fieldDecoratorRules = {
  rules: [{ required: true, min: 1, message: 'Please input a marker name' }],
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddMarker extends React.Component {
  componentDidMount() {
    // To disabled the add button at the initial render
    const { form } = this.props;
    form.validateFields();
  }

  componentDidUpdate() {
    // To disabled the add button at the subsequent renders
    const { form } = this.props;
    const shouldValidate = isUndefined(form.getFieldValue('name')) && isUndefined(form.getFieldError('name'));

    if (shouldValidate) {
      form.validateFields();
    }
  }

  handleSubmit = (resetFields, getFieldValue, dispatch) => (e) => {
    e.preventDefault();
    const name = getFieldValue('name');
    resetFields(['name']);
    dispatch(addMarker(name));
  };

  render() {
    const { dispatch, form } = this.props;

    const {
      getFieldDecorator,
      getFieldValue,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      resetFields,
    } = form;

    const fieldDecorator = getFieldDecorator('name', fieldDecoratorRules);
    // don't show error unless a field is touched
    const nameError = isFieldTouched('name') && getFieldError('name');

    return (
      <MarkerForm
        hideRequiredMark
        onSubmit={this.handleSubmit(resetFields, getFieldValue, dispatch)}
      >
        <FormInput validateStatus={nameError ? 'error' : ''} help={nameError || ''}>
          {fieldDecorator(<Input />)}
        </FormInput>
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            Add marker
          </Button>
        </FormItem>
      </MarkerForm>
    );
  }
}

export default connect()(Form.create({})(AddMarker));

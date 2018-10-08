import React from 'react';
import PropTypes from 'prop-types';
import isUndefined from 'lodash/isUndefined';
import {
  Input, Form, FormInput, FormItem, Button, MarkerForm,
} from './Styled';


const fieldDecoratorRules = {
  rules: [{ required: true, min: 1, message: 'Please input a marker name' }],
};

const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field]);

class AddMarker extends React.Component {
  static propTypes = {
    addMarker: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    // disable the add button at the initial render
    const { form } = this.props;
    form.validateFields();
  }

  componentDidUpdate() {
    // disable the add button for an empty input at the subsequent renders
    const { form } = this.props;
    const shouldValidate = isUndefined(form.getFieldValue('name')) && isUndefined(form.getFieldError('name'));

    if (shouldValidate) {
      form.validateFields();
    }
  }

  handleSubmit = (e) => {
    const {
      addMarker,
      form: { getFieldValue, resetFields },
    } = this.props;

    e.preventDefault();
    const name = getFieldValue('name');
    resetFields(['name']);
    addMarker(name);
  };

  render() {
    const { form } = this.props;

    const {
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched,
    } = form;

    const fieldDecorator = getFieldDecorator('name', fieldDecoratorRules);
    // don't show an error unless the field is touched
    const nameError = isFieldTouched('name') && getFieldError('name');

    return (
      <MarkerForm hideRequiredMark onSubmit={this.handleSubmit}>
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

export default Form.create({})(AddMarker);

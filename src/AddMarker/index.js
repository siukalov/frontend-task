import React from 'react';
import isUndefined from 'lodash/isUndefined';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Form, Button, Input } from 'antd';
import { addMarker } from '../actions';

const FormItem = Form.Item;

const FormInput = styled(FormItem)`
  display: flex;
  flex-grow: 1;

  & > .ant-form-item-control-wrapper {
    flex-grow: 1;
    margin-right: 8px;
  }
`;

const DirectionForm = styled(Form)`
  margin: 16px 16px 0;
  display: flex;
  justify-content: flex-start;
`;

const fieldDecoratorRules = {
  rules: [{ required: true, min: 1, message: 'Please input a marker name' }],
};

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddDirection extends React.Component {
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
      <DirectionForm
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
      </DirectionForm>
    );
  }
}

export default connect()(Form.create({})(AddDirection));

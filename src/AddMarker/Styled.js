import styled from 'styled-components';
import { Form, Button, Input } from 'antd';

export { Form, Button, Input };

export const FormItem = Form.Item;

export const FormInput = styled(FormItem)`
  display: flex;
  flex-grow: 1;

  & > .ant-form-item-control-wrapper {
    flex-grow: 1;
    margin-right: 8px;
  }
`;

export const MarkerForm = styled(Form)`
  margin: 16px 16px 0;
  display: flex;
  justify-content: flex-start;
`;

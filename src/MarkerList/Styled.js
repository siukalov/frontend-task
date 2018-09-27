import styled from 'styled-components';
import { List, Button as AntdButton } from 'antd';

export const Button = styled(AntdButton)`
  background-color: #fff;
  border: none;
  box-shadow: none;
`;

export const Item = styled(List.Item)`
  margin: 0 16px 8px;
  padding-left: 8px;
  border-radius: 4px;
  user-select: none;
  background-color: #fff;
  box-shadow: 0 1px 0 #ccc;
`;

export { List };

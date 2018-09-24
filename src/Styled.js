import { Layout } from 'antd';
import styled from 'styled-components';

const { Content: AntdContent, Sider } = Layout;

export { Layout };

export const LayoutPositioned = styled(Layout)`
  margin-left: 50vw;

  @media (min-width: 768px) {
    margin-left: 33vw;
  }
`;

export const Aside = styled(Sider)`
  background-color: #eceff3;
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;

export const Content = styled(AntdContent)`
  background-color: #fff;
  height: 100vh;
  width: 100%;
`;

export const MapPlaceholder = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9a1bc;
`;

export const AddMarkerPlaceholder = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #a9eee6;
`;

export const MarkerListPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background-color: #625772;
`;

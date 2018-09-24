import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';

const { Content: AntdContent, Sider } = Layout;

const LayoutPositioned = styled(Layout)`
  margin-left: 50vw;
  @media (min-width: 768px) {
    margin-left: 33vw;
  }
`;

const Aside = styled(Sider)`
  background-color: #eceff3;
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
`;

const Content = styled(AntdContent)`
  background-color: #fff;
  height: 100vh;
  width: 100%;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f9a1bc;
`;

const AddMarkerPlaceholder = styled.div`
  width: 100%;
  height: 20vh;
  background-color: #a9eee6;
`;

const MarkerListPlaceholder = styled.div`
  width: 100%;
  height: calc(80vh + 50px);
  background-color: #625772;
`;

const App = () => (
  <Layout>
    <Aside breakpoint="md" width="33vw" collapsedWidth="50vw">
      <AddMarkerPlaceholder />
      <MarkerListPlaceholder />
    </Aside>
    <LayoutPositioned>
      <Content>
        <MapPlaceholder />
      </Content>
    </LayoutPositioned>
  </Layout>
);

export default App;

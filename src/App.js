import React from 'react';
import {
  Layout, LayoutPositioned, Aside, Content, MapPlaceholder,
} from './Styled';
import AddMarker from './AddMarker';
import MarkerList from './MarkerList';

const App = () => (
  <Layout>
    <Aside breakpoint="md" width="33vw" collapsedWidth="50vw">
      <AddMarker />
      <MarkerList />
    </Aside>
    <LayoutPositioned>
      <Content>
        <MapPlaceholder />
      </Content>
    </LayoutPositioned>
  </Layout>
);

export default App;

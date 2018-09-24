import React from 'react';
import {
  Layout,
  LayoutPositioned,
  Aside,
  Content,
  AddMarkerPlaceholder,
  MarkerListPlaceholder,
  MapPlaceholder,
} from './Styled';
import AddMarker from './AddMarker';

const App = () => (
  <Layout>
    <Aside breakpoint="md" width="33vw" collapsedWidth="50vw">
      <AddMarker />
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

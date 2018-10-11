import React from 'react';
import {
  Layout, LayoutPositioned, Aside, Content,
} from './Styled';
import AddMarker from './AddMarker';
import MarkerList from './MarkerList';
import Map from './Map';

const App = () => (
  <Layout>
    <Aside breakpoint="md" width="33vw" collapsedWidth="50vw">
      <AddMarker />
      <MarkerList />
    </Aside>
    <LayoutPositioned>
      <Content>
        <Map
          settings={{
            center: [55.76, 37.64],
            zoom: 16,
            controls: ['zoomControl'],
            behaviors: ['drag'],
          }}
        />
      </Content>
    </LayoutPositioned>
  </Layout>
);

export default App;

import React, { memo } from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import {
  Container,
} from 'semantic-ui-react';
import store from './store';
import Router from './routes';

const PaddedContainer = styled(Container)`
  padding-top: 2.5vw;
  padding-bottom: .5vh;
`;

const App = memo(() => (
  <Provider store={store}>
    <PaddedContainer textAlign="center">
      <Router />
    </PaddedContainer>
  </Provider>
));

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { Container } from 'semantic-ui-react';
import store from '../../store';
import PostAdd from '../PostAdd';
import PostList from '../PostList';

const App = () => (
  <Provider store={store}>
    <Container textAlign="center">
      <PostAdd />
      <PostList />
    </Container>
  </Provider>
);

export default App;

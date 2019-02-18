import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import PostAdd from '../PostAdd';
import PostList from '../PostList';

const App = () => (
  <Provider store={store}>
    <PostAdd />
    <PostList />
  </Provider>
);

export default App;

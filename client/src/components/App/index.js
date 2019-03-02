import React from 'react';
import { Provider } from 'react-redux';
import { Header } from 'semantic-ui-react';
import store from '../../store';
import PaddedContainer from './PaddedContainer';
import PostAdd from '../PostAdd';
import PostList from '../PostList';
import PostModal from '../PostModal';

const App = () => (
  <Provider store={store}>
    <PaddedContainer textAlign="center">
      <Header size="huge">Readable Project</Header>
      <PostAdd />
      <PostList />
      <PostModal />
    </PaddedContainer>
  </Provider>
);

export default App;

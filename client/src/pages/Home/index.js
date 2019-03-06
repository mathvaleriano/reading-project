import React, { lazy, memo, Suspense } from 'react';
import Loader from '../../components/Loader';

const PostAdd = lazy(() => import('../../components/PostAdd'));
const PostList = lazy(() => import('../../components/PostList'));

const Home = memo(() => (
  <Suspense
    fallback={(<Loader />)}
  >
    <PostAdd />
    <PostList />
  </Suspense>
));

export default Home;

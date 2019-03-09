import React from 'react';
import {
  BrowserRouter, Link, Redirect, Route, Switch,
} from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import Home from '../pages/Home';
import PostDetail from '../pages/PostDetail';
import NotFound from '../pages/404';

const routes = [
  { path: '/404', component: NotFound },
  { path: '/:category/:postId', component: PostDetail },
  { path: '/:category', component: Home },
  { path: '/', component: Home },
];

const Router = () => (
  <BrowserRouter>
    <>
      <Link to="/">
        <Header size="huge">Readable Project</Header>
      </Link>
      <Switch>
        {
        routes.map(({ component: Component, path }) => (
          <Route
            exact
            path={path}
            render={props => <Component {...props} />}
            key={path}
          />
        ))
      }
        <Redirect to="/" />
      </Switch>
    </>
  </BrowserRouter>
);

export default Router;

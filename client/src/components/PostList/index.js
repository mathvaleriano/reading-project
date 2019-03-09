// eslint-disable-next-line import/no-extraneous-dependencies
import { filter, orderBy } from 'lodash';
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Feed, Container } from 'semantic-ui-react';
import Header from './Header';
import Post from '../Post';
import {
  getPosts as getPostsAction,
  handleSetCurrentPost,
} from '../../store/posts/actions';
import { postType } from '../../types/post';
import { getCategories as getCategoriesAction } from '../../store/categories/actions';

const PostList = memo(({
  currentOrder,
  getCategories,
  getPosts,
  onSetCurrentPost,
  posts = [],
  match: { params: { category } },
}) => {
  const [postList, setPosts] = useState(posts);

  useEffect(() => {
    getCategories();
    getPosts();
  }, []);

  useEffect(() => {
    const orderedList = orderBy(posts, currentOrder, 'desc');
    const filteredList = category
      ? filter(orderedList, { category })
      : orderedList;

    setPosts(filteredList);
  }, [posts, category, currentOrder]);

  return (
    <Container>
      <Header />
      <Feed>
        { postList.length
          ? postList.map(post => (
            !post.deleted && (
              <Post
                post={post}
                key={post.id}
                onClickComments={() => onSetCurrentPost(post)}
              />
            )
          ))
          : 'No posts found'
        }
      </Feed>
    </Container>
  );
});

PostList.propTypes = {
  currentOrder: PropTypes.string.isRequired,
  getCategories: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      category: PropTypes.string,
    }),
  }),
  onSetCurrentPost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape(postType),
  ),
};

PostList.defaultProps = {
  match: { params: { category: '' } },
  posts: [],
};

const mapStateToProps = ({
  posts: { posts },
  order: { currentOrder },
}) => ({
  posts,
  currentOrder,
});

const mapDispatchToProps = {
  getCategories: getCategoriesAction,
  getPosts: getPostsAction,
  onSetCurrentPost: handleSetCurrentPost,
};

const ConnectedPostList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);

export default withRouter(ConnectedPostList);

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Feed, Container } from 'semantic-ui-react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { filter, orderBy } from 'lodash';
import Header from './Header';
import Post from '../Post';
import {
  getPosts as getPostsAction,
  handleSetCurrentPost,
} from '../../store/posts/actions';
import {
  getCategories as getCategoriesAction,
} from '../../store/categories/actions';
import { postType } from '../../types/post';

const PostList = memo(({
  currentCategory,
  currentOrder,
  getPosts,
  getCategories,
  onSetCurrentPost,
  posts = [],
}) => {
  const [postList, setPosts] = useState(posts);

  useEffect(() => {
    getPosts();
    getCategories();
  }, []);

  useEffect(() => {
    const orderedList = orderBy(posts, currentOrder, 'desc');
    const filteredList = filter(orderedList, { category: currentCategory });

    setPosts(filteredList);
  }, [posts, currentCategory, currentOrder]);

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
  currentCategory: PropTypes.string,
  currentOrder: PropTypes.string.isRequired,
  getCategories: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  onSetCurrentPost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape(postType),
  ),
};

PostList.defaultProps = {
  currentCategory: '',
  posts: [],
};

const mapStateToProps = ({
  posts: { posts },
  categories: { currentCategory },
  order: { currentOrder },
}) => ({
  posts,
  currentCategory,
  currentOrder,
});

const mapDispatchToProps = {
  getCategories: getCategoriesAction,
  getPosts: getPostsAction,
  onSetCurrentPost: handleSetCurrentPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);

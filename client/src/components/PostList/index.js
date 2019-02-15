import React from 'react';
import PropTypes from 'prop-types';
import { Feed } from 'semantic-ui-react';
import Post from '../Post';

const PostList = ({ posts = [] }) => (
  <Feed>
    {
      posts.map(post => <Post {...post} />)
    }
  </Feed>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string,
      timestamp: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

PostList.defaultProps = {
  posts: [],
};

export default PostList;

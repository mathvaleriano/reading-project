import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Feed } from 'semantic-ui-react';
import Post from '../Post';
import {
  getPosts as getPostsAction,
} from '../../store/posts/actions';

const PostList = ({ getPosts, posts = [] }) => {
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Feed>
      { posts.length
        ? posts.map(post => <Post {...post} key={post.id} />)
        : 'No posts found'
      }
    </Feed>
  );
};

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string,
      commentCount: PropTypes.number,
      timestamp: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ),
};

PostList.defaultProps = {
  posts: [],
};

const mapStateToProps = ({ posts: { posts } }) => ({
  posts,
});

const mapDispatchToProps = {
  getPosts: getPostsAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);

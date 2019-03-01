import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Feed, Container } from 'semantic-ui-react';
import Header from './Header';
import Post from '../Post';
import {
  getPosts as getPostsAction,
  handleSetCurrentPost,
} from '../../store/posts/actions';

const PostList = ({ getPosts, onClickComments, posts = [] }) => {
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <Container>
      <Header />
      <Feed>
        { posts.length
          ? posts.map(post => (
            !post.deleted && (
              <Post
                {...post}
                key={post.id}
                onClickComments={() => onClickComments(post)}
              />
            )
          ))
          : 'No posts found'
        }
      </Feed>
    </Container>
  );
};

PostList.propTypes = {
  getPosts: PropTypes.func.isRequired,
  onClickComments: PropTypes.func.isRequired,
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
  onClickComments: handleSetCurrentPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostList);

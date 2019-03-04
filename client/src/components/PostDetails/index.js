import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Feed, Container } from 'semantic-ui-react';
import { postType } from '../../types/post';

import Post from '../Post';
import CommentList from '../CommentList';
import CommentAdd from '../CommentAdd';

const PostDetails = memo(({ post }) => (
  <Container fluid>
    <Feed>
      <Post post={post} />
    </Feed>
    <CommentAdd postId={post.id} />
    <CommentList />
  </Container>
));

PostDetails.propTypes = {
  post: PropTypes.shape(postType).isRequired,
};

export default PostDetails;

import React from 'react';
import { Modal } from 'semantic-ui-react';
import Post from '../Post';
import CommentList from '../CommentList';


const PostModal = ({ post }) => (
  <Modal size="tiny">
    <Modal.Header>Profile Picture</Modal.Header>
    <Modal.Content scrolling>
      <Post {...post} />
      <CommentList postId={post} />
    </Modal.Content>
  </Modal>
);

export default PostModal;

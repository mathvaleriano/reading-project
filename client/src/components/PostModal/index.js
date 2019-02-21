import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, Feed } from 'semantic-ui-react';
import Post from '../Post';
import CommentList from '../CommentList';
import {
  setCurrentPost,
} from '../../store/posts/actions';

const PostModal = ({ currentPost, onClose }) => (
  <Modal
    open={!!currentPost}
    onClose={() => onClose()}
    size="tiny"
  >
    { currentPost
        && (
        <Modal.Content scrolling>
          <Feed>
            <Post {...currentPost} />
          </Feed>
          <CommentList />
        </Modal.Content>
        )
      }
  </Modal>
);

PostModal.propTypes = {
  currentPost: PropTypes.shape({
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string,
    commentCount: PropTypes.number,
    timestamp: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

PostModal.defaultProps = {
  currentPost: undefined,
};

const mapStateToProps = ({ posts: { currentPost } }) => ({
  currentPost,
});

const mapDispatchToProps = {
  onClose: setCurrentPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostModal);

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment as SUIComment } from 'semantic-ui-react';
import Comment from '../Comment';
import { commentType } from '../../types/comment';

const CommentList = memo(({ comments = [] }) => (
  <SUIComment.Group style={{ textAlign: 'left' }}>
    { comments.length > 0
      && comments.map(comment => (
        !comment.deleted
        && <Comment comment={comment} key={comment.id} />
      ))
    }
  </SUIComment.Group>
));

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape(commentType),
  ),
};

CommentList.defaultProps = {
  comments: [],
};

const mapStateToProps = ({ comments: { comments } }) => ({
  comments,
});

export default connect(mapStateToProps)(CommentList);

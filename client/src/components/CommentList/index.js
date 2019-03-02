import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment as SUIComment } from 'semantic-ui-react';
import Comment from '../Comment';

const CommentList = memo(({ comments = [] }) => (
  <SUIComment.Group>
    { comments.length
      && comments.map(comment => (
        !comment.deleted
        && <Comment comment={comment} key={comment.id} />
      ))
    }
  </SUIComment.Group>
));

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      voteScore: PropTypes.number,
    }),
  ),
};

CommentList.defaultProps = {
  comments: [],
};

const mapStateToProps = ({ comments: { comments } }) => ({
  comments,
});

export default connect(mapStateToProps)(CommentList);

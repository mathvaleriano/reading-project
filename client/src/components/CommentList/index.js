import React from 'react';
import PropTypes from 'prop-types';
import { Comment as SUIComment } from 'semantic-ui-react';
import Comment from '../Comment';

const CommentList = ({ comments = [] }) => (
  <SUIComment.Group>
    { comments.length > 0
      && comments.map(comment => <Comment {...comment} key={comment.id} />)
    }
  </SUIComment.Group>
);

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

export default CommentList;

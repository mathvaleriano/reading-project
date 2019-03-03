import React, { memo } from 'react';
import { Comment } from 'semantic-ui-react';
import { commentSummaryType } from '../../../types/comment';

const CommentSummary = memo(({
  author,
  timestamp,
}) => (
  <>
    <Comment.Author as="a">{author}</Comment.Author>

    <Comment.Metadata>
      {new Date(timestamp).toLocaleString()}
    </Comment.Metadata>
  </>
));

CommentSummary.propTypes = commentSummaryType;

export default CommentSummary;

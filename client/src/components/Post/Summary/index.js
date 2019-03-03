import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Feed, Input } from 'semantic-ui-react';
import { postSummaryType } from '../../../types/post';

const Summary = memo(({
  author,
  isEditing,
  timestamp,
  title,
}) => (
  <Feed.Summary>
    {isEditing
      ? (
        <Input
          name="title"
          placeholder="Type a new Title"
          defaultValue={title}
        />
      )
      : (
        <>
          <Feed.User>{author}</Feed.User>
          {' '}
          {title}
          {' '}
          <Feed.Date>{new Date(timestamp).toLocaleString()}</Feed.Date>
        </>
      )
    }
  </Feed.Summary>
));

Summary.propTypes = {
  ...postSummaryType,
  isEditing: PropTypes.bool.isRequired,
};

export default Summary;

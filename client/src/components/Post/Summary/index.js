import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Feed, Input } from 'semantic-ui-react';

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
  author: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Summary;

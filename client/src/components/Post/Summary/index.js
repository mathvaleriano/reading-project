import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Feed, Input } from 'semantic-ui-react';
import { postType } from '../../../types/post';

const Summary = memo(({
  post,
  isEditing,
}) => {
  const {
    author, id, category, timestamp, title,
  } = post;

  return (
    <Feed.Summary>
      {isEditing
        ? (
          <Input
            required
            name="title"
            placeholder="Type a new Title"
            defaultValue={title}
          />
        )
        : (
          <>
            <Feed.User
              style={{ color: '#000' }}
            >
              {author}
            </Feed.User>

            {' '}
            <Link to={`/${category}/${id}`}>
              {title}
            </Link>
            {' '}

            <Feed.Date>{new Date(timestamp).toLocaleString()}</Feed.Date>
          </>
        )
      }
    </Feed.Summary>
  );
});

Summary.propTypes = {
  post: PropTypes.shape(postType).isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default Summary;

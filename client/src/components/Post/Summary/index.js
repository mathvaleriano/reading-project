import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Feed } from 'semantic-ui-react';

const Summary = memo(({
  author,
  timestamp,
  title,
}) => (
  <Feed.Summary>
    <Feed.User>{author}</Feed.User>
    {' '}
    {title}
    {' '}
    <Feed.Date>{new Date(timestamp).toLocaleString()}</Feed.Date>
  </Feed.Summary>
));

Summary.propTypes = {
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Summary;

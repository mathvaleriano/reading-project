import React from 'react';
import PropTypes from 'prop-types';
import { Feed } from 'semantic-ui-react';

const Post = ({
  author, body, category, timestamp, title,
}) => (
  <Feed.Event>
    <Feed.Label icon="user circle outline" />
    <Feed.Content>
      <Feed.Summary>
        <Feed.User>{author}</Feed.User>
        {' '}
        {title}
        {' '}
        <Feed.Date>{timestamp}</Feed.Date>
      </Feed.Summary>
      <Feed.Extra text>{body}</Feed.Extra>
      <Feed.Meta>
        <Feed.Like icon="thumbs up outline" />
        <Feed.Like icon="thumbs down outline" />
        {category
          && (
          <Feed.Like>
              #
            {category}
          </Feed.Like>
          )
        }
      </Feed.Meta>
    </Feed.Content>
  </Feed.Event>
);

Post.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string,
  timestamp: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

Post.defaultProps = {
  category: '',
};

export default Post;

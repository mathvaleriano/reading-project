import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Feed } from 'semantic-ui-react';
import Summary from './Summary';
import Meta from './Meta';

const Post = memo(({
  body, ...props
}) => (
  <Feed.Event>
    <Feed.Content>
      <Summary {...props} />

      <Feed.Extra text>{body}</Feed.Extra>

      <Meta {...props} />
    </Feed.Content>
  </Feed.Event>
));

Post.propTypes = {
  body: PropTypes.string.isRequired,
};

export default Post;

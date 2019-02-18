import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';

const Meta = ({ category, commentCount }) => (
  <Feed.Meta>
    <Feed.Like icon="thumbs up outline" />
    <Feed.Like icon="thumbs down outline" />
    <Feed.Like>
      <Icon name="comments outline" />
      {commentCount > 0 && commentCount}
    </Feed.Like>
    {category && (
    <Feed.Like>
      #
      {category}
    </Feed.Like>
    )}
  </Feed.Meta>
);

Meta.propTypes = {
  category: PropTypes.string,
  commentCount: PropTypes.number,
};

Meta.defaultProps = {
  category: '',
  commentCount: 0,
};

export default Meta;

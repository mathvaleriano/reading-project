import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';
import {
  handleUpVote,
  handleDownVote,
} from '../../../store/posts/actions';

const Meta = memo(({
  category,
  commentCount,
  id,
  onClickComments,
  onClickDownVote,
  onClickUpVote,
  voteScore,
}) => (
  <Feed.Meta>
    <Feed.Like
      icon="thumbs up outline"
      onClick={() => onClickUpVote(id)}
    />
    <Feed.Like
      icon="thumbs down outline"
      onClick={() => onClickDownVote(id)}
    />
    Vote Score:
    {' '}
    { voteScore }
    <Feed.Like onClick={onClickComments}>
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
));

Meta.propTypes = {
  category: PropTypes.string,
  commentCount: PropTypes.number,
  id: PropTypes.string.isRequired,
  onClickComments: PropTypes.func,
  onClickDownVote: PropTypes.func.isRequired,
  onClickUpVote: PropTypes.func.isRequired,
  voteScore: PropTypes.number,
};

Meta.defaultProps = {
  category: '',
  commentCount: 0,
  onClickComments: () => {},
  voteScore: 0,
};

const mapDispatchToProps = {
  onClickDownVote: handleDownVote,
  onClickUpVote: handleUpVote,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Meta);

import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';
import {
  handleRemovePost,
  handleUpVote,
  handleDownVote,
} from '../../../store/posts/actions';

const Meta = memo(({
  author,
  category,
  commentCount,
  id,
  onClickComments,
  onClickDownVote,
  onClickRemove,
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

    {author === 'You'
      && (
      <Feed.Like onClick={() => onClickRemove(id)}>
        <Icon name="trash" />
        Remove
      </Feed.Like>
      )
    }

    {category && (
    <Feed.Like>
      #
      {category}
    </Feed.Like>
    )}
  </Feed.Meta>
));

Meta.propTypes = {
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
  commentCount: PropTypes.number,
  id: PropTypes.string.isRequired,
  onClickComments: PropTypes.func,
  onClickDownVote: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
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
  onClickRemove: handleRemovePost,
  onClickUpVote: handleUpVote,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Meta);

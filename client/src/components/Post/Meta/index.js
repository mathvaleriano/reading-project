import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Feed, Icon } from 'semantic-ui-react';
import {
  handleRemovePost,
  handleUpVote,
  handleDownVote,
} from '../../../store/posts/actions';
import MetaSubmit from '../../MetaSubmit';

const Meta = memo(({
  author,
  category,
  commentCount,
  id,
  isEditing,
  onClickComments,
  onClickDownVote,
  onClickRemove,
  onClickUpVote,
  toggleIsEditing,
  voteScore,
}) => {
  const isOwner = author === 'You';

  const getOwnerActions = () => (
    isOwner
      && (
        <>
          <Feed.Like onClick={() => onClickRemove(id)}>
            Remove
          </Feed.Like>

          {isEditing
            && (
            <MetaSubmit type="submit">
              Save
            </MetaSubmit>
            )
          }

          <Feed.Like onClick={toggleIsEditing}>
            { isEditing ? 'Cancel' : 'Edit' }
          </Feed.Like>
        </>
      )
  );

  return (
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

      {getOwnerActions()}

      {category && (
      <Feed.Like>
        #
        {category}
      </Feed.Like>
      )}
    </Feed.Meta>
  );
});

Meta.propTypes = {
  author: PropTypes.string.isRequired,
  category: PropTypes.string,
  commentCount: PropTypes.number,
  id: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onClickComments: PropTypes.func,
  onClickDownVote: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickUpVote: PropTypes.func.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
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

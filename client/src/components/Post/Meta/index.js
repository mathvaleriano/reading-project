import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Feed, Icon } from 'semantic-ui-react';
import {
  handleRemovePost,
  handleUpVote,
  handleDownVote,
} from '../../../store/posts/actions';
import MetaSubmit from '../../MetaSubmit';
import { postMetaType, postMetaTypeDefaultValues } from '../../../types/post';

const Meta = memo(({
  author,
  category,
  commentCount,
  id,
  isEditing,
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

      <Link to={`/${category}/${id}`}>
        <Icon name="comments outline" />
        {commentCount}
      </Link>

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
  ...postMetaType,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onClickDownVote: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onClickUpVote: PropTypes.func.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
};

Meta.defaultProps = {
  ...postMetaTypeDefaultValues,
  onClickComments: () => {},
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

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Comment, Icon } from 'semantic-ui-react';
import MetaSubmit from '../../MetaSubmit';
import {
  commentActionsType,
} from '../../../types/comment';
import {
  handleUpVote,
  handleDownVote,
  handleRemoveComment,
} from '../../../store/comments/actions';


const CommentActions = memo(({
  id,
  isEditing,
  isOwner,
  onClickDownVote,
  onClickUpVote,
  onClickRemove,
  parentId,
  onToggleIsEditing,
  voteScore,
}) => (
  <Comment.Actions>
    <Comment.Action onClick={() => onClickUpVote(id)}>
      <Icon name="thumbs up outline" />
    </Comment.Action>

    <Comment.Action onClick={() => onClickDownVote(id)}>
      <Icon name="thumbs down outline" />
    </Comment.Action>

    <Comment.Action>
      Vote Score:
      {' '}
      {voteScore}
    </Comment.Action>

    { isOwner
      && (
        <>
          {isEditing
            && (
              <MetaSubmit type="submit">
                Save
              </MetaSubmit>
            )
          }

          <Comment.Action onClick={onToggleIsEditing}>
            { isEditing ? 'Cancel' : 'Edit' }
          </Comment.Action>

          <Comment.Action
            onClick={() => onClickRemove({ id, parentId })}
          >
            Remove
          </Comment.Action>
        </>
      )
    }
  </Comment.Actions>
));

CommentActions.propTypes = {
  ...commentActionsType,
  id: PropTypes.string.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onClickDownVote: PropTypes.func.isRequired,
  onClickUpVote: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onToggleIsEditing: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onClickDownVote: handleDownVote,
  onClickUpVote: handleUpVote,
  onClickRemove: handleRemoveComment,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(CommentActions);

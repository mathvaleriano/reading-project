import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Comment as SUIComment,
  Icon,
  TextArea,
} from 'semantic-ui-react';
import {
  handleUpVote,
  handleDownVote,
  handleRemoveComment,
  handleUpdateComment,
} from '../../store/comments/actions';
import MetaSubmit from '../MetaSubmit';
import Form from '../Form';

const Comment = memo(({
  comment,
  onClickDownVote,
  onClickUpVote,
  onClickRemove,
  onUpdateComment,
}) => {
  const {
    author,
    body,
    id,
    parentId,
    timestamp,
    voteScore = 0,
  } = comment;
  const isOwner = author === 'You';

  const [isEditing, setIsEditing] = useState(false);

  const toggleIsEditing = () => setIsEditing(!isEditing);

  const handleSubmit = (data) => {
    toggleIsEditing();
    return onUpdateComment({ ...data, comment });
  };

  return (
    <SUIComment key={id}>
      <Form onSubmit={handleSubmit} hasCustomSubmit>
        <SUIComment.Content>
          <SUIComment.Author as="a">{author}</SUIComment.Author>

          <SUIComment.Metadata>
            <div>{new Date(timestamp).toLocaleString()}</div>
          </SUIComment.Metadata>

          <SUIComment.Text>
            { isEditing
              ? (
                <TextArea
                  name="body"
                  placeholder="Type a new comment..."
                  defaultValue={body}
                />
              )
              : body
          }
          </SUIComment.Text>

          <SUIComment.Actions>
            <SUIComment.Action onClick={() => onClickUpVote(id)}>
              <Icon name="thumbs up outline" />
            </SUIComment.Action>

            <SUIComment.Action onClick={() => onClickDownVote(id)}>
              <Icon name="thumbs down outline" />
            </SUIComment.Action>

            <SUIComment.Action>
            Vote Score:
              {' '}
              {voteScore}
            </SUIComment.Action>

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

                <SUIComment.Action onClick={toggleIsEditing}>
                  { isEditing ? 'Cancel' : 'Edit' }
                </SUIComment.Action>

                <SUIComment.Action onClick={() => onClickRemove({ id, parentId })}>
                  Remove
                </SUIComment.Action>
              </>
            )
          }
          </SUIComment.Actions>
        </SUIComment.Content>
      </Form>
    </SUIComment>
  );
});

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore: PropTypes.number,
  }).isRequired,
  onClickDownVote: PropTypes.func.isRequired,
  onClickUpVote: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
  onUpdateComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onClickDownVote: handleDownVote,
  onClickUpVote: handleUpVote,
  onClickRemove: handleRemoveComment,
  onUpdateComment: handleUpdateComment,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Comment);

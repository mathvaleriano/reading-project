import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Comment as SUIComment,
  TextArea,
} from 'semantic-ui-react';
import {
  handleUpdateComment,
} from '../../store/comments/actions';
import CommentSummary from './Summary';
import CommentActions from './Actions';
import Form from '../Form';
import { commentType } from '../../types/comment';
import useIsEditing from '../../hooks/useIsEditing';

const Comment = memo(({
  comment,
  onUpdateComment,
}) => {
  const {
    author,
    body,
    id,
    timestamp,
  } = comment;
  const isOwner = author === 'You';
  const { isEditing, toggleIsEditing } = useIsEditing();

  const handleSubmit = (data) => {
    toggleIsEditing();
    return onUpdateComment({ ...data, comment });
  };

  return (
    <SUIComment key={id}>
      <Form onSubmit={handleSubmit} hasCustomSubmit>
        <SUIComment.Content>
          <CommentSummary
            author={author}
            timestamp={timestamp}
          />

          <SUIComment.Text>
            { isEditing
              ? (
                <TextArea
                  required
                  name="body"
                  placeholder="Type a new comment..."
                  defaultValue={body}
                />
              )
              : body
          }
          </SUIComment.Text>

          <CommentActions
            {...comment}
            isOwner={isOwner}
            isEditing={isEditing}
            onToggleIsEditing={toggleIsEditing}
          />
        </SUIComment.Content>
      </Form>
    </SUIComment>
  );
});

Comment.propTypes = {
  comment: PropTypes.shape(commentType).isRequired,
  onUpdateComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onUpdateComment: handleUpdateComment,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(Comment);

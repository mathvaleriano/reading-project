import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form as SUIForm } from 'semantic-ui-react';
import Form from '../Form';
import { handleAddComment } from '../../store/comments/actions';

const CommentAdd = memo(({ onSubmit, postId }) => (
  <Form onSubmit={onSubmit}>
    <input
      name="parentId"
      type="hidden"
      value={postId}
    />

    <SUIForm.TextArea
      name="body"
      placeholder="Type a comment..."
      required
    />
  </Form>
));

CommentAdd.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  onSubmit: handleAddComment,
};

export default connect(null, mapDispatchToProps)(CommentAdd);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form as SUIForm } from 'semantic-ui-react';
import { handleAddPost } from '../../store/posts/actions';
import Form from '../Form';

const PostAdd = ({ onSubmit }) => (
  <Form onSubmit={onSubmit}>
    <SUIForm.Input
      required
      fluid
      placeholder="What's happening?"
      name="title"
    />
    <SUIForm.TextArea
      required
      placeholder="Explain..."
      name="body"
    />
  </Form>
);

PostAdd.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onSubmit: handleAddPost,
};

export default connect(null, mapDispatchToProps)(PostAdd);

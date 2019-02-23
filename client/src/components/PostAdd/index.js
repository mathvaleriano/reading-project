import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form as SUIForm, Icon } from 'semantic-ui-react';
import { handleAddPost } from '../../store/posts/actions';
import Form from '../Form';

const PostAdd = ({ onAddPost }) => (
  <Form onSubmit={onAddPost}>
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
    <SUIForm.Button primary icon labelPosition="right">
        Send
      <Icon name="send" />
    </SUIForm.Button>
  </Form>
);

PostAdd.propTypes = {
  onAddPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onAddPost: handleAddPost,
};

export default connect(null, mapDispatchToProps)(PostAdd);

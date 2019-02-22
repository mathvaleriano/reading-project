import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon } from 'semantic-ui-react';
import { handleAddPost } from '../../store/posts/actions';

const PostAdd = ({ onAddPost }) => {
  const [data, setData] = useState({});

  const handleChange = key => (e, { value }) => {
    setData({ ...data, [key]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const now = new Date();
    const post = {
      ...data,
      timestamp: now.getTime(),
      author: 'You',
      id: now.toISOString(),
    };
    onAddPost(post);

    setData({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        required
        fluid
        placeholder="What's happening?"
        onChange={handleChange('title')}
      />
      <Form.TextArea
        required
        placeholder="Explain..."
        onChange={handleChange('body')}
      />
      <Form.Button primary icon labelPosition="right">
        Send
        <Icon name="send" />
      </Form.Button>
    </Form>
  );
};

PostAdd.propTypes = {
  onAddPost: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onAddPost: handleAddPost,
};

export default connect(null, mapDispatchToProps)(PostAdd);

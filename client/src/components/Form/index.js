import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import { Form as SUIForm, Icon } from 'semantic-ui-react';

const Form = ({ children, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { target } = e;
    const now = new Date();
    const {
      id = now.toISOString(),
      ...data
    } = serialize(target, { hash: true });
    const post = {
      ...data,
      timestamp: now.getTime(),
      author: 'You',
      id,
    };

    onSubmit(post)
      .then(() => target.reset());
  };

  return (
    <SUIForm onSubmit={handleSubmit}>
      {children}
      <SUIForm.Button
        primary
        icon
        labelPosition="right"
      >
          Send
        <Icon name="send" />
      </SUIForm.Button>
    </SUIForm>
  );
};

Form.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;

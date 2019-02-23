import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import { Form as SUIFORM } from 'semantic-ui-react';

const Form = ({ children, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { target } = e;
    const data = serialize(target, { hash: true });
    const now = new Date();
    const post = {
      ...data,
      timestamp: now.getTime(),
      author: 'You',
      id: now.toISOString(),
    };
    onSubmit(post);
    target.reset();
  };

  return (
    <SUIFORM onSubmit={handleSubmit}>
      {children}
    </SUIFORM>
  );
};

Form.propTypes = {
  children: PropTypes.element.isRequired,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: () => {},
};

export default Form;

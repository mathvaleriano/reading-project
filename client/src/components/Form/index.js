import React, { memo } from 'react';
import PropTypes from 'prop-types';
import serialize from 'form-serialize';
import { Form as SUIForm, Icon } from 'semantic-ui-react';

const Form = memo(({ children, onSubmit, hasCustomSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { target } = e;
    const now = new Date();
    const {
      id = now.getTime().toString(),
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
      {!hasCustomSubmit
        && (
        <SUIForm.Button
          primary
          icon
          labelPosition="right"
        >
            Send
          <Icon name="send" />
        </SUIForm.Button>
        )
      }
    </SUIForm>
  );
});

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]).isRequired,
  hasCustomSubmit: PropTypes.bool,
  onSubmit: PropTypes.func,
};

Form.defaultProps = {
  hasCustomSubmit: false,
  onSubmit: () => {},
};

export default Form;

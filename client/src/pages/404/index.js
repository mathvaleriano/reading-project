import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header } from 'semantic-ui-react';
import { setErrors } from '../../store/posts/actions';

const NotFound = memo(({ onSetErrors }) => {
  useEffect(() => { onSetErrors(); }, []);

  return (
    <Header as="h2">
      404: Not Found
    </Header>
  );
});

NotFound.propTypes = {
  onSetErrors: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  onSetErrors: setErrors,
};

export default connect(
  undefined,
  mapDispatchToProps,
)(NotFound);

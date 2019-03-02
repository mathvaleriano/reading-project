import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form as SUIForm } from 'semantic-ui-react';
import { handleAddPost } from '../../store/posts/actions';
import Form from '../Form';
import useCategories from '../../hooks/useCategories';

const PostAdd = memo(({ onSubmit, categoryList }) => {
  const categoryOptions = useCategories(categoryList);

  return (
    <Form onSubmit={onSubmit}>
      <SUIForm.Group>
        <SUIForm.Input
          required
          fluid
          placeholder="What's happening?"
          name="title"
          width={12}
        />
        <SUIForm.Select
          required
          options={categoryOptions}
          name="category"
          placeholder="Category"
          width={4}
        />
      </SUIForm.Group>
      <SUIForm.TextArea
        required
        placeholder="Explain..."
        name="body"
      />
    </Form>
  );
});

PostAdd.propTypes = {
  categoryList: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
};

PostAdd.defaultProps = {
  categoryList: [],
};

const mapStateToProps = ({ categories: { list: categoryList } }) => ({
  categoryList,
});

const mapDispatchToProps = {
  onSubmit: handleAddPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostAdd);

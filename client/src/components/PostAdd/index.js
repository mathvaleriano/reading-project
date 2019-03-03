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
      <SUIForm.Group widths="equal">
        <SUIForm.Input
          required
          placeholder="What's happening?"
          name="title"
        />

        <SUIForm.Field
          required
          control="select"
          name="category"
          placeholder="Category"
        >
          {
            categoryOptions.map(({ value, text }) => (
              <option value={value} key={value}>
                {text}
              </option>
            ))
          }
        </SUIForm.Field>
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
  categoryList: PropTypes.arrayOf(PropTypes.object),
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
